const Business = require('./business')

const Routes = function (router, use) {
  use(async (ctx, next) => {
    await next()
    console.log(`ANSWERING: ${ctx.status} - ${ctx.method} - ${ctx.originalUrl}`)
  })

  /** Bills */
  router.get('/bills', Business.Bills.get)
  router.post('/bills', Business.Bills.create)
  router.put('/bills', Business.Bills.update)

    /** BillPayments */
  router.get('/billPayments', Business.BillPayments.get)
  router.post('/billPayments', Business.BillPayments.create)
  router.put('/billPayments', Business.BillPayments.update)

  /** Orders */
  router.get('/orders', Business.Orders.get)
  router.post('/orders', Business.Orders.create)
  router.put('/orders', Business.Orders.update)

  /** OrderDelivery */
  router.get('/orderDelivery', Business.OrderDelivery.get)
  router.post('/orderDelivery', Business.OrderDelivery.create)
  router.put('/orderDelivery', Business.OrderDelivery.update)
}

module.exports = Routes
