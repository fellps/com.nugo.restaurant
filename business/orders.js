const DB = require('../database')
const _ = require('lodash')
const businessResult = require('../business/businessResult')

const Orders = {
  get: async (ctx) => {
    const Order = DB.Order()
    const params = ctx.query
    try {
      const orders = await Order.find(params)
      return businessResult.success(ctx, orders)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  },

  create: async (ctx) => {
    const Order = DB.Order()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return businessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Order.findOne({ IdOrder: params.IdOrder })
      if (_.isEmpty(value)) {
        value = await Order.insert(Object.assign({}, params, { date: (new Date()) }))
      }
      return businessResult.success(ctx, value)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = Orders