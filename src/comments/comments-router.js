const express = require('express')
const commentsService = require('./comments-service')
const path = require('path')
const commentsRouter = express.Router()
const jsonParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

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
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { content, thread_id} = req.body
    const newComment = { content, thread_id}
    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newComment.user_id = req.user.id
    commentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${comment.id}`))
        .json(comment)
      })
      .catch(next)
  })

commentsRouter
  .route('/:comment_id')
  .all(requireAuth)
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
  .patch(jsonParser, (req, res, next) => {
    const { content} = req.body
    const commentToUpdate = { content}

    for (const [key, value] of Object.entries(commentToUpdate))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    commentsService.updateComment(
      req.app.get('db'),
      req.params.comment_id,
      commentToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })




module.exports = commentsRouter