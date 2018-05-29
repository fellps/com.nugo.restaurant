const config = require('../config')
const DB = require('monk')(config.database)

const Bill = () => DB.get('bill')
const Order = () => DB.get('order')
const OrderDelivery = () => DB.get('orderDelivery')

module.exports = {
  Bill: Bill,
  Order: Order,
  OrderDelivery: OrderDelivery
}
