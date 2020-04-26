const xss = require('xss')
const Treeize = require('treeize')
const threadsService = {
  getAllThreads(knex) {
    return knex
      .from('threads AS th')
      .select(
        'th.id',
        'th.thread_title',
        'th.thread_content',
        'th.topic_id',
        'th.modified',
        ...userFields,
        knex.raw(
          `count(DISTINCT cmt) AS number_of_comments`
        ),
      )
      .leftJoin(
        'comments AS cmt',
        'th.id',
        'cmt.thread_id',
      )
      .leftJoin(
        'users AS usr',
        'th.user_id',
        'usr.id',
      )
      .groupBy('th.id', 'usr.id')
  },
  test(knex){
    return knex.select('comments.content').from('comments')
  },
  insertThread(knex, newThread) {
    return knex
      .insert(newThread)
      .into('threads')
      .returning('*')
      .then(([thread]) => thread)
      .then(thread => threadsService.getById(knex, thread.id))
  },
  getById(knex, id) {
    return knex.from('threads').select('*').where('id', id).first()
  },
  deleteThread(knex, id) {
    return knex('threads')
      .where({ id })
      .delete()
  },
  updateThread(knex, id, newThreadFields) {
    return knex('threads')
      .where({ id })
      .update(newThreadFields)
  },
  getCommentsForThread(knex, thread_id) {
    return knex
    .select(
      'comments.id',
      'comments.content',
      'comments.user_id',
      'comments.modified',
    )
      .from('comments')
      .where('comments.thread_id', thread_id)
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
      topic_id: thread.topic_id,
      modified: thread.modified,
      user: threadData.user || {},
      number_of_comments: Number(threadData.number_of_comments) || 0,
    }
  },

  serializecomment(comment) {
    return {
      id: comment.id,
      content: xss(comment.content),
      likes: comment.likes,
      user_id: comment.user_id,
      thread_id: comment.thread_id,
      modified: comment.modified,
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

module.exports = threadsService