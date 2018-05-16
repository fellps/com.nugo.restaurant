/* global describe, it */

const should = require('should')
const request = require('supertest')
const server = require('../index')

const mockBill = require('./mockData/bill')

describe('Bills', () => {
  it('Should insert a bill', (done) => {
    request(server)
      .post('/bills')
      .send(mockBill)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data.IdBill.should.equal(mockBill.IdBill)
        done()
    })
  }).timeout(5000)

  it('Should return a bill', (done) => {
    request(server)
      .get(`/bills?IdBill=${mockBill.IdBill}`)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data[0].IdBill.should.equal(mockBill.IdBill)
        done()
    })
  }).timeout(5000)
})