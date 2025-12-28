const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      group: ['author'],
    })
    res.json(authors)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }  
})

module.exports = router