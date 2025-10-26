const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog } = require('../models')
const { User } = require('../models')
const { SECRET } = require('../util/config')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (e) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.post('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
  return res.json(blog)
})

router.put('/:id', async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

router.delete('/:id', async (req, res) => {
  try {
    await Blog.destroy({
      where: { id: req.params.id }
    })
    
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router