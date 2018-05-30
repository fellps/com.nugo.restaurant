const DB = require('../database')
const _ = require('lodash')
const businessResult = require('../business/businessResult')

const OrderDelivery = {
  get: async (ctx) => {
    const OrderDelivery = DB.OrderDelivery()
    const params = ctx.query
    try {
      const orderDelivery = await OrderDelivery.aggregate([
        {
          $lookup: {
            from: "order",
            localField : "IdOrder",
            foreignField : "IdOrder",
            as : "Order"
          },
        },
        { $unwind: "$Order" },
        {
          $lookup: {
            from: "bill",
            localField : "Order.IdBill",
            foreignField : "IdBill",
            as : "Bill"
          },
        },
        { $unwind: "$Bill" },
        {
          $match : { "Bill.BillStatus": 1 }
        },
        {
          $project: {
            "IdOrderDelivery": 1,
            "IdOrder": 1
          }
        }
      ])
      return businessResult.success(ctx, orderDelivery)
    } catch (err) {
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