
function makeUsersArray(){
  return [
    {
      id: 1,
      username: 'user1',
      password: 'pass1',
      name: 'user1'
    },
    {
      id: 2,
      username: 'user2',
      password: 'pass2',
      name: 'user2'
    },
    {
      id: 3,
      username: 'user3',
      password: 'pass3',
      name: 'user3'
    }
  ]
}

function makeTopicsArray(){
  return [
    {
      id: 1,
      topic_name: 'General',
      topic_content: 'General discussion about Pokemon Go!.'
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

function makeThreadsArray(user, topic) {
  return [
    {
      id: 1,
      thread_title: 'events',
      thread_content: 'When is Valentine event start?',
      user_id: user[0].id,
      topic_id: topic[0].id,
      modified: '2020-02-22T21:28:32.615Z'
    },
    {
      id: 2,
      thread_title: 'hello',
      thread_content: 'Add me',
      user_id: user[1].id,
      topic_id: topic[1].id,
      modified: '2020-03-22T20:28:32.615Z'
    }
  ]
}

function makeCommentsArray(user, thread) {
  return [
    {
      id: 1,
      content: 'test 1',
      user_id: user[0].id,
      thread_id: thread[0].id,
      modified: '2020-02-22T21:28:32.615Z'
    },
    {
      id: 2,
      content: 'test 2',
      user_id: user[0].id,
      thread_id: thread[0].id,
      modified: '2020-03-22T21:28:32.615Z'
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
  makeThreadsArray,
  makeUsersArray,
  makeCommentsArray,
  cleanTables,
}