const commentsService = {
  getAllComments(knex) {
    return knex.select('*').from('comments')
  },
  getById(knex, id) {
    return knex
      .from('comments AS cmt')
      .select(
        'cmt.id',
        'cmt.content',
        'cmt.thread_id',
        'cmt.user_id',
        'cmt.modified',
        knex.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
              usr.id,
              usr.user_name,
              usr.full_name,
              usr.date_created,
              usr.date_modified
            ) tmp )
          ) AS "user"`
        )
      )
      .leftJoin(
        'users AS usr',
        'cmt.user_id',
        'usr.id',
      )
      .where('cmt.id', id)
      .first()
  },
  insertComment(knex, newComment) {
    return knex
      .insert(newComment)
      .into('comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment => 
        commentsService.getById(knex, comment.id)
      )
  },
  deleteComment(knex, id) {
    return knex('comments')
      .where({ id })
      .delete()
  },
  updateComment(knex, id, newCommentFields) {
    return knex('comments')
      .where({ id })
      .update(newCommentFields)
  },
}

module.exports = commentsService