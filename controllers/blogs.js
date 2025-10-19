const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  const blog = await Blog.create(req.body)
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

/* const errorHandler = (error, req, res, next) => {
  if (error.name === 'TypeError') {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
} */

module.exports = router