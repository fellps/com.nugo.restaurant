const config = require('../config')
const DB = require('monk')(config.database)

const Bill = () => DB.get('bill')
const BillPayment = () => DB.get('billPayment')
const Order = () => DB.get('order')
const OrderDelivery = () => DB.get('orderDelivery')

module.exports = {
  Bill: Bill,
  BillPayment: BillPayment,
  Order: Order,
  OrderDelivery: OrderDelivery
}
