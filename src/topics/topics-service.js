const topicsService = {
  getAllTopics(knex) {
    return knex.select('*').from('topics')
  },
  getById(knex, id) {
    return knex.from('topics').select('*').where('id', id).first()
  },
}

module.exports = topicsService