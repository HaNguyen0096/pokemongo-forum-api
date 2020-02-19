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

}

module.exports = topicsService