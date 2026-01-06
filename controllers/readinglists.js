const router = require('express').Router()

const UserBlogs = require('../models/user_blogs')

router.post('/', async (req, res) => {
  const readingListRow = await UserBlogs.create(req.body)
  res.json(readingListRow)
})

module.exports = router
