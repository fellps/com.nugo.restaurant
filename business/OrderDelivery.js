const DB = require('../database')
const _ = require('lodash')
const BusinessResult = require('../business/BusinessResult')

const OrderDelivery = {
  get: async (ctx) => {
    const OrderDelivery = DB.OrderDelivery()
    const Order = DB.Order()
    const params = ctx.query
    try {
      const order = await Order.find({ IdBill: params.IdBill })
      const arrIdOrder = order.map(function(value) {
        return value.IdOrder
      })
      const orderDelivery = await OrderDelivery.find({ IdOrder: { $in: arrIdOrder }})
      
      return BusinessResult.success(ctx, orderDelivery)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while searching in DB')
    }
  },

  create: async (ctx) => {
    const OrderDelivery = DB.OrderDelivery()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await OrderDelivery.findOne({ IdOrderDelivery: params.IdOrderDelivery })
      if (_.isEmpty(value)) {
        value = await OrderDelivery.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return BusinessResult.success(ctx, value)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const OrderDelivery = DB.OrderDelivery()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await OrderDelivery.findOne({ IdOrderDelivery: params.IdOrderDelivery })
      if (!_.isEmpty(value)) {
        await OrderDelivery.update(value, { $set: params })
        value = await OrderDelivery.findOne({ IdOrderDelivery: params.IdOrderDelivery })
        return BusinessResult.success(ctx, value)
      }
      return BusinessResult.error(ctx, 'Object not found')
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = OrderDelivery