const Business = require('./business')

const Routes = function (router, use) {
  use(async (ctx, next) => {
    await next()
    console.log(`ANSWERING: ${ctx.status} - ${ctx.method} - ${ctx.originalUrl}`)
  })

  /** Bills */
  router.get('/bills', Business.Bills.get)
  router.post('/bills', Business.Bills.create)

  /** Orders */
  router.get('/orders', Business.Orders.get)
  router.post('/orders', Business.Orders.create)
}

module.exports = Routes
