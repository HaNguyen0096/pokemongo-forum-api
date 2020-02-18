function makeTopicsArray(){
  return [
    {
      id: 1,
      topic_name: 'General',
      topic_content: 'General discussion about Pokemon Go.'
    },
    {
      id: 2,
      topic_name: 'Introduction',
      topic_content: 'Introduce yourselves here!'
    },
    {
      id: 3,
      topic_name: 'Friends & Trading',
      topic_content: 'All trading topics go here.'
    },
    {
      id: 4,
      topic_name: 'Gyms & Raids',
      topic_content: 'Post strategy for gym defend and raid battle here.'
    },
    {
      id: 5,
      topic_name: 'PvP',
      topic_content: 'Place for PvP discussion.'
    }
  ]
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE comments, threads, topics, users RESTART IDENTITY CASCADE`
  )
}

module.exports = {
  makeTopicsArray,
  cleanTables,
}