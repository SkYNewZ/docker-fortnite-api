// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
import { AppServer } from '../src/index'
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('News', () => {
  it('it should return news', (done) => {
    chai.request(AppServer)
      .get('/news')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should return news in french', (done) => {
    chai.request(AppServer)
      .get('/news/fr')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should return news in it', (done) => {
    chai.request(AppServer)
      .get('/news/it')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})