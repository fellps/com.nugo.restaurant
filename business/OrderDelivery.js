const DB = require('../database')
const _ = require('lodash')
const businessResult = require('../business/businessResult')

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
      
      return businessResult.success(ctx, orderDelivery)
    } catch (err) {
      console.log(err)
      return businessResult.error(ctx, 'Error while searching in DB')
    }
  },

  create: async (ctx) => {
    const OrderDelivery = DB.OrderDelivery()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return businessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await OrderDelivery.findOne({ IdOrderDelivery: params.IdOrderDelivery })
      if (_.isEmpty(value)) {
        value = await OrderDelivery.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return businessResult.success(ctx, value)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const OrderDelivery = DB.OrderDelivery()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return businessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await OrderDelivery.findOne({ IdOrderDelivery: params.IdOrderDelivery })
      if (!_.isEmpty(value)) {
        await OrderDelivery.update(value, { $set: params })
        value = await OrderDelivery.findOne({ IdOrderDelivery: params.IdOrderDelivery })
        return businessResult.success(ctx, value)
      }
      return businessResult.error(ctx, 'Object not found')
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = OrderDelivery