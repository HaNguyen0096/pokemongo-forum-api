require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const topicsRouter = require('./topics/topics-router')
const threadsRouter = require('./threads/threads-router')
const commentsRouter = require('./comments/comments-router')
const usersRouter = require('./users/users-router')
//const {CLIENT_ORIGIN} = require('./config')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))


app.use(
    cors({
        //origin: CLIENT_ORIGIN
    })
);
app.use(helmet())

app.use('/api/topics', topicsRouter)
app.use('/api/threads', threadsRouter)
app.use('/api/comments', commentsRouter)
// app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'server error' }
  } else {
    console.error(error)
    response = { error: error.message, details: error }
  }
  res.status(500).json(response)
})

module.exports = app
