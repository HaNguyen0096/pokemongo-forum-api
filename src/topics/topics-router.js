const express = require('express')
const topicsService = require('./topics-service')

const topicsRouter = express.Router()
//const jsonParser = express.json()

topicsRouter
  .route('/')
  .get((req, res, next) => {
    topicsService.getAllTopics(
      req.app.get('db')
    )
      .then(topics => {
        res.json(topics)
      })
      .catch(next)
  })

topicsRouter
  .route('/:topic_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    topicsService.getById(knexInstance, req.params.topic_id)
      .then(topic => {
        if (!topic) {
          return res.status(404).json({
            error: { message: `Topic doesn't exist` }
          })
        }
        res.json(topic)
      })
      .catch(next)
  })

topicsRouter
  .route('/:topic_id/threads/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    topicsService.getThreadsForTopic(knexInstance,req.params.topic_id)
      .then(threads => {
        if (!threads) {
          return res.status(404).json({
            error: { message: `There is no thread` }
          })
        }
        res.json(threads)
      })
      .catch(next)
  })

module.exports = topicsRouter