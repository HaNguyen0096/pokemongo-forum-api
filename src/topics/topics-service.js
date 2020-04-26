const xss = require('xss')
const Treeize = require('treeize')

const topicsService = {

  getAllTopics(knex) {
    return knex
      .from('topics')
      .select(
        'topics.id',
        'topics.topic_name',
        'topics.topic_content',
        knex.raw(
          `count(DISTINCT th) AS number_of_threads`
        ),
      )
      .leftJoin(
        'threads AS th',
        'topics.id',
        'th.topic_id',
      )
      .groupBy(
        'topics.id'
      )
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
        'threads.topic_id',
        'threads.modified',
        ...userFields,
        knex.raw(
          `count(DISTINCT cmt) AS number_of_comments`
        ),
      )
      .where('threads.topic_id', topic_id)
      .leftJoin(
        'comments AS cmt',
        'threads.id',
        'cmt.thread_id',
      )
      .leftJoin(
        'users AS usr',
        'threads.user_id',
        'usr.id',
      )
      .groupBy('threads.id', 'usr.id')
      
  },

  serializeTopics(topics) {
    return topics.map(this.serializeTopic)
  },

  serializeTopic(topic) {
    const topicTree = new Treeize()
    const topicData = topicTree.grow([ topic ]).getData()[0]
    return {
      id: topicData.id,
      topic_name: xss(topicData.topic_name),
      topic_content: xss(topicData.topic_content),
      number_of_threads: Number(topicData.number_of_threads) || 0,
    }
  },

  serializeThreads(threads) {
    return threads.map(this.serializeThread)
  },

  serializeThread(thread) {
    const threadTree = new Treeize()
    const threadData = threadTree.grow([ thread ]).getData()[0]
    return {
      id: threadData.id,
      thread_title: xss(threadData.thread_title),
      thread_content: xss(threadData.thread_content),
      user_id: threadData.user_id,
      topic_id: threadData.topic_id,
      modified: threadData.modified,
      user: threadData.user || {},
      number_of_comments: Number(threadData.number_of_comments) || 0,
    }
  },

}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = topicsService