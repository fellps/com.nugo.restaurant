const DB = require('../database')
const _ = require('lodash')
const BusinessResult = require('../business/BusinessResult')

const Bills = {
  get: async (ctx) => {
    const Bill = DB.Bill()
    const params = ctx.query
    if (Object.prototype.hasOwnProperty.call(params, 'TableNumber'))
      params.TableNumber = parseInt(params.TableNumber)
    if (Object.prototype.hasOwnProperty.call(params, 'BillStatus'))
      params.BillStatus = parseInt(params.BillStatus)
    try {
      const bills = await Bill.find(params)
      return BusinessResult.success(ctx, bills)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  create: async (ctx) => {
    const Bill = DB.Bill()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Bill.findOne({ IdBill: params.IdBill })
      if (_.isEmpty(value)) {
        value = await Bill.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return BusinessResult.success(ctx, value)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const Bill = DB.Bill()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await Bill.findOne({ IdBill: params.IdBill })
      if (!_.isEmpty(value)) {
        await Bill.update(value, { $set: params })
        value = await Bill.findOne({ IdBill: params.IdBill })
        return BusinessResult.success(ctx, value)
      }
      return BusinessResult.error(ctx, 'Object not found')
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = Bills