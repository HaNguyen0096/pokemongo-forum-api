const xss = require('xss')

const threadsService = {
  getAllThreads(knex) {
    return knex.select('*').from('threads')
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
      'comments.likes',
      'comments.user_id',
      'comments.modified',
    )
      .from('comments')
      .where('comments.thread_id', thread_id)
  },


  serializeThread(thread) {
    return {
      id: thread.id,
      thread_title: xss(thread.thread_title),
      thread_content: xss(thread.thread_content),
      likes: thread.likes,
      user_id: thread.user_id,
      topic_id: thread.topic_id,
      modified: thread.modified,
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

module.exports = threadsService