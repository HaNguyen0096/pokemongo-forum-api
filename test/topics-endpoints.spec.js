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

  context('Given there are topics in the database', () => {
    const testTopics = helpers.makeTopicsArray()

    it('GET /topics responds with 200 and all of the topics', () => {
      return supertest(app)
        .get('/topics')
        .expect(200, testTopics)
    })
  })
})