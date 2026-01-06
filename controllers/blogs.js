const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog } = require('../models')
const { User } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    const containsSearchWord = {
      [Op.iLike]: `%${req.query.search}%`,
    }

    where[Op.or] = [
      { title: containsSearchWord },
      { author: containsSearchWord },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  })
  return res.json(blog)
})

router.put('/:id', async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id)
    if (blog.userId !== user.id) {
      return res
        .status(401)
        .json({ error: 'only the creator of a blog can delete it' })
    }
    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
