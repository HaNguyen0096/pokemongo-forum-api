module.exports = {
  CLIENT_ORIGIN: 'https://hanguyen-pokemongo-forum.now.sh',
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/pokemongo',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/pokemongo-test',
}
