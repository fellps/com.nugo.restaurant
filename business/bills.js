const DB = require('../database')
const _ = require('lodash')
const businessResult = require('../business/businessResult')

const Bills = {
  get: async (ctx) => {
    const Bill = DB.Bill()
    const params = ctx.query
    try {
      const bills = await Bill.find(params)
      return businessResult.success(ctx, bills)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  },

  create: async (ctx) => {
    const Bill = DB.Bill()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return businessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Bill.findOne({ IdBill: params.IdBill })
      if (_.isEmpty(value)) {
        value = await Bill.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return businessResult.success(ctx, value)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const Bill = DB.Bill()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return businessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Bill.findOne({ IdBill: params.IdBill })
      if (!_.isEmpty(value)) {
        await Bill.update(value, params)
        return businessResult.success(ctx, value)
      }
      return businessResult.error(ctx, 'Object not found')
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = Bills