const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const { router: blogsRouter, errorHandler: blogsErrorHandler } = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(blogsErrorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
