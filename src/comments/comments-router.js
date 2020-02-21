const express = require('express')
const commentsService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

commentsRouter
  .route('/')
  .get((req, res, next) => {
    commentsService.getAllComments(
      req.app.get('db')
    )
      .then(comments => {
        res.json(comments)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { content, thread_id, user_id=1 } = req.body
    const newComment = { content, thread_id, user_id }
    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    commentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
      res
        .status(201)
        .location(`/comments/${comment.id}`)
        .json(comment)
      })
      .catch(next)
  })

commentsRouter
  .route('/:comment_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    commentsService.getById(knexInstance, req.params.comment_id)
      .then(comment => {
        if (!comment) {
          return res.status(404).json({
            error: { message: `Comment doesn't exist` }
          })
        }
        res.json(comment)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    commentsService.deleteComment(
      req.app.get('db'),
      req.params.comment_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })



module.exports = commentsRouter