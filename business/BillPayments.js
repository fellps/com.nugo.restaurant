const DB = require('../database')
const _ = require('lodash')
const BusinessResult = require('../business/BusinessResult')

const BillPayments = {
  get: async (ctx) => {
    const BillPayment = DB.BillPayment()
    const params = ctx.query
    try {
      const billPayments = await BillPayment.find(params)
      return BusinessResult.success(ctx, billPayments)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  create: async (ctx) => {
    const BillPayment = DB.BillPayment()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await BillPayment.findOne({ IdBillPayments: params.IdBillPayments })
      if (_.isEmpty(value)) {
        value = await BillPayment.insert(Object.assign({}, params, { CreatedAt: (new Date()) }))
      }
      return BusinessResult.success(ctx, value)
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  },

  update: async (ctx) => {
    const BillPayment = DB.BillPayment()
    const params = ctx.request.body
    if (_.isEmpty(params)) {
      return BusinessResult.error(ctx, 'The request body is empty')
    }
    try {
      let value = await BillPayment.findOne({ IdBillPayments: params.IdBillPayments })
      if (!_.isEmpty(value)) {
        await BillPayment.update(value, { $set: params })
        value = await BillPayment.findOne({ IdBillPayments: params.IdBillPayments })
        return BusinessResult.success(ctx, value)
      }
      return BusinessResult.error(ctx, 'Object not found')
    } catch (err) {
      return BusinessResult.error(ctx, 'Error while saving in DB')
    }
  }
}

module.exports = BillPayments
