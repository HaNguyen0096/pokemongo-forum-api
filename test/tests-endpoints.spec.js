const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Topic Endpoint`, function(){
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => helpers.cleanTables(db))

  afterEach('cleanup',() => helpers.cleanTables(db))

  describe(`GET /api/topics`, () => {
    context(`Given no topic`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/topics')
          .expect(200, [])
      })
    })
    context('Given there are topics in the database', () => {
      const testTopic=helpers.makeTopicsArray()
      beforeEach('insert topics', () => {
        return db.into('topics').insert(testTopic)
      })
  
      it('GET /api/topics responds with 200 and all of the topics', () => {
        return supertest(app)
          .get('/api/topics')
          .expect(200, testTopic)
      })
    })
  })
  
  describe(`GET /api/threads`, () => {
    context(`Given no threads`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/threads')
          .expect(200, [])
      })
    })
    context('Given there are threads in the database', () => {
      const testUser = helpers.makeUsersArray()
      const testTopic = helpers.makeTopicsArray()
      const testThreads = helpers.makeThreadsArray(testUser, testTopic)
      beforeEach('insert threads', () => {
        return db.transaction(async t => {
          await t.into('users').insert(testUser)
          await t.into('topics').insert(testTopic)
          await t.into('threads').insert(testThreads)
        })
      })
  
      it('GET /threads responds with 200 and all of the threads', () => {
        return supertest(app)
          .get('/api/threads')
          .expect(200, testThreads)
      })
    })
  })

  describe(`GET /comments`, () => {
    context(`Given no comments`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/comments')
          .expect(200, [])
      })
    })
    context(`Given there are comments in the database`, () =>{
      const testUser = helpers.makeUsersArray()
      const testTopic = helpers.makeTopicsArray()
      const testThreads = helpers.makeThreadsArray(testUser, testTopic)
      const testComments = helpers.makeCommentsArray(testUser, testThreads)
      beforeEach('insert threads', () => {
        return db.transaction(async t => {
          await t.into('users').insert(testUser)
          await t.into('topics').insert(testTopic)
          await t.into('threads').insert(testThreads)
          await t.into('comments').insert(testComments)
        })
      })
  
      it('GET /comments responds with 200 and all of the comments', () => {
        return supertest(app)
          .get('/api/comments')
          .expect(200, testComments)
      })
    })
  })


  // describe(`POST /threads`, () => {
  //   before('clean the table', () => helpers.cleanTables(db))
  //   context('Insert threads', () => {
  //     const testUser = helpers.makeUsersArray()
  //     const testTopic = helpers.makeTopicsArray()
  //     const testThreads = helpers.makeThreadsArray(testUser, testTopic)
      
  //     beforeEach('insert threads', () => {
  //       return db.transaction(async t => {
  //         await t.into('users').insert(testUser)
  //         await t.into('topics').insert(testTopic)
  //         await t.into('threads').insert(testThreads)
  //       })
  //     })
  
  //     it('create new thread, response with 201 and the new Thread', () => {
  //       const newThread = {
  //         thread_title: 'event',
  //         thread_content: 'When is Valentine event start?',
  //         user_id: 1,
  //         topic_id: 1
  //       }
  //       return supertest(app)
  //         .post('/threads')
  //         .send(newThread)
  //         .expect(201)
  //         .expect(res => {
  //           expect(res.body).to.have.property('id')
  //           expect(res.body.thread_title).to.eql(newThread.thread_title)
  //           expect(res.body.thread_content).to.eql(newThread.thread_content)
  //           expect(res.body.user_id).to.eql(newThread.user_id)
  //           expect(res.body.topic_id).to.eql(testThread.topic_id)
  //           expect(res.headers.location).to.eql(`/threads/${res.body.id}`)
  //           const expectedDate = new Date().toLocaleString()
  //           const actualDate = new Date(res.body.modified).toLocaleString()
  //           expect(actualDate).to.eql(expectedDate)
  //         })
  //     })
  //   })
  // })
})