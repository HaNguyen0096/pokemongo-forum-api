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
      'comments.user_id',
      'comments.modified',
    )
      .from('comments')
      .where('comments.thread_id', thread_id)
  },
}

module.exports = threadsService