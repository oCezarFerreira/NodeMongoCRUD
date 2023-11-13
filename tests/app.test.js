const supertest = require('supertest')
const app = require('../app')

test('GET /', async () => {
  const response = await supertest(app)
    .get('/')

  expect(response.statusCode).toEqual(200)
  expect(response.body.message).toEqual('Oi express!')
})
