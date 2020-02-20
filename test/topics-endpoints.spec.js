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

  describe(`GET /topics`, () => {
    context('Given there are topics in the database', () => {
      const testTopic=helpers.makeTopicsArray()
      beforeEach('insert topics', () => {
        return db.into('topics').insert(testTopic)
      })
  
      it('GET /topics responds with 200 and all of the topics', () => {
        return supertest(app)
          .get('/topics')
          .expect(200, testTopic)
      })
    })
  })
  
  // describe(`GET /threads`, () => {
  //   context('Given there are threads in the database', () => {
  //     const testUsers = helpers.makeUsersArray()
  //     const testTopic = helpers.makeTopicsArray()
  //     const testThreads = helpers.makeThreadsArray(testUsers, testTopic)
  //     beforeEach('insert threads', () => {
  //       return db.transaction(async t => {
  //         await t.into('users').insert(testUsers)
  //         await t.into('topics').insert(testTopic)
  //         await t.into('threads').insert(testThreads)
  //       })
  //     })
  
  //     it('GET /threads responds with 200 and all of the threads', () => {
  //       return supertest(app)
  //         .get('/threads')
  //         .expect(200, testThreads)
  //     })
  //   })
  // })

  // describe(` POST /threads`, () => {
  //   context(``)
  // })
})