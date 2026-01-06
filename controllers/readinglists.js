const router = require('express').Router()

const { User, UserBlogs } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')

router.post('/', async (req, res) => {
  const readingListRow = await UserBlogs.create(req.body)
  res.json(readingListRow)
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const readingListRow = await UserBlogs.findByPk(req.params.id)
  if (user.id !== readingListRow.userId) {
    return res.status(401).json({
      error: "only blogs in the user's own reading list can be marked as read",
    })
  }
  if (!req.body || !('read' in req.body)) {
    return res.status(400).json({
      error: "provide a value for 'read' in request body",
    })
  }
  readingListRow.read = req.body.read
  await readingListRow.save()
  res.json(readingListRow)
})

module.exports = router
