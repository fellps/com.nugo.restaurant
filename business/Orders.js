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
        value = await Order.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return businessResult.success(ctx, value)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const Order = DB.Order()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return businessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Order.findOne({ IdOrder: params.IdOrder })
      if (!_.isEmpty(value)) {
        await Order.update(value, { $set: params })
        value = await Order.findOne({ IdOrder: params.IdOrder })
        return businessResult.success(ctx, value)
      }
      return businessResult.error(ctx, 'Object not found')
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = Orders
