const DB = require('../database')
const _ = require('lodash')
const BusinessResult = require('../business/BusinessResult')

const Orders = {
  get: async (ctx) => {
    const Order = DB.Order()
    const params = ctx.query
    try {
      const orders = await Order.find(params)
      return BusinessResult.success(ctx, orders)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  create: async (ctx) => {
    const Order = DB.Order()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Order.findOne({ IdOrder: params.IdOrder })
      if (_.isEmpty(value)) {
        value = await Order.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return BusinessResult.success(ctx, value)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const Order = DB.Order()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Order.findOne({ IdOrder: params.IdOrder })
      if (!_.isEmpty(value)) {
        await Order.update(value, { $set: params })
        value = await Order.findOne({ IdOrder: params.IdOrder })
        return BusinessResult.success(ctx, value)
      }
      return BusinessResult.error(ctx, 'Object not found')
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = Orders
