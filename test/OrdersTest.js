/* global describe, it */

const should = require('should')
const request = require('supertest')
const server = require('../index')

const mockOrder = require('./mockData/Order')

describe('Orders', () => {
  it('Should insert a order and order items', (done) => {
    request(server)
      .post('/orders')
      .send(mockOrder)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data.IdOrder.should.equal(mockOrder.IdOrder)
        done()
    })
  }).timeout(5000)

  it('Should update a order and order items', (done) => {
    request(server)
      .put('/orders')
      .send(mockOrder)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data.IdOrder.should.equal(mockOrder.IdOrder)
        done()
    })
  }).timeout(5000)

  it('Should return a order and order items', (done) => {
    request(server)
      .get(`/orders?IdOrder=${mockOrder.IdOrder}`)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data[0].IdOrder.should.equal(mockOrder.IdOrder)
        done()
    })
  }).timeout(5000)
})