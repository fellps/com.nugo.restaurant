/* global describe, it */

const should = require('should')
const request = require('supertest')
const server = require('../index')

const mockOrderDelivery = require('./mockData/OrderDelivery')

describe('OrderDelivery', () => {
  it('Should insert a order delivery', (done) => {
    request(server)
      .post('/orderDelivery')
      .send(mockOrderDelivery)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data.IdOrder.should.equal(mockOrderDelivery.IdOrder)
        done()
    })
  }).timeout(5000)

  it('Should update a order delivery', (done) => {
    request(server)
      .put('/orderDelivery')
      .send(mockOrderDelivery)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data.IdOrder.should.equal(mockOrderDelivery.IdOrder)
        done()
    })
  }).timeout(5000)

  it('Should return a order delivery', (done) => {
    request(server)
      .get(`/orderDelivery?IdOrder=${mockOrderDelivery.IdOrder}`)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        should.not.exist(err)
        res.body.should.have.properties('data', 'error', 'message', 'requestedAt')
        res.body.error.should.be.equal(false)
        res.body.data[0].IdOrder.should.equal(mockOrderDelivery.IdOrder)
        done()
    })
  }).timeout(5000)
})