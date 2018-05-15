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
        value = await Bill.insert(Object.assign({}, params, { date: (new Date()) }))
      }
      return businessResult.success(ctx, value)
    } catch (err) {
      return businessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = Bills