const xss = require('xss')

const topicsService = {

  getAllTopics(knex) {
    return knex.select('*').from('topics')
  },

  getById(knex, id) {
    return knex.from('topics').select('*').where('id', id).first()
  },

  getThreadsForTopic(knex, topic_id) {
    return knex
      .from('threads')
      .select(
        'threads.id',
        'threads.thread_title',
        'threads.thread_content',
        'threads.user_id',
        'threads.modified',
      )
      .where('threads.topic_id', topic_id)
  },



  serializeTopic(topic) {
    return {
      id: topic.id,
      topic_name: xss(topic.topic_name),
      topic_content: xss(topic.topic_content),
    }
  },

  serializeThread(thread) {
    return {
      id: thread.id,
      thread_title: xss(thread.thread_title),
      thread_content: xss(thread.thread_content),
      user_id: thread.user_id,
      topic_id: thread.topic_id,
      modified: thread.modified,
    }
  },

}

module.exports = topicsService