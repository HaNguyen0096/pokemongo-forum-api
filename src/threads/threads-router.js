const express = require('express')
const threadsService = require('./threads-service')
const path = require('path')
const threadsRouter = express.Router()
const jsonParser = express.json()

threadsRouter
  .route('/')
  .get((req, res, next) => {
    threadsService.getAllThreads(
      req.app.get('db')
    )
    .then(threads => {
      res.json(threads.map(thread => (threadsService.serializeThread(thread))))
    })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { thread_title, thread_content, topic_id, user_id=1 } = req.body
    const newThread = { thread_title, thread_content, topic_id, user_id }
    for (const [key, value] of Object.entries(newThread))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    threadsService.insertThread(
      req.app.get('db'),
      newThread
    )
      .then(thread => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${thread.id}`))
          .json(threadsService.serializeThread(thread))
      })
      .catch(next)
  })

threadsRouter
  .route('/:thread_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    threadsService.getById(knexInstance, req.params.thread_id)
      .then(thread => {
        if (!thread) {
          return res.status(404).json({
            error: { message: `Thread doesn't exist` }
          })
        }
        res.json(threadsService.serializeThread(thread))
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    threadsService.deleteThread(
      req.app.get('db'),
      req.params.thread_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { thread_title, thread_content} = req.body
    const threadToUpdate = { thread_title, thread_content}

    for (const [key, value] of Object.entries(threadToUpdate))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    threadsService.updateThread(
      req.app.get('db'),
      req.params.thread_id,
      threadToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

threadsRouter
  .route('/:thread_id/comments')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    threadsService.getCommentsForThread(knexInstance, req.params.thread_id)
      .then(comments => {
        res.json(comments.map(comment => (threadsService.serializecomment(comment))))
      })
      .catch(next)
  })


module.exports = threadsRouter