const config = require('./config')
const osTmpdir = require('os-tmpdir')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaRoute = require('koa-route')
const session = require('koa-session')
const methods = require('methods')
const _ = require('lodash')
const ip = require('ip')

const app = new Koa()

const Routes = require('./routes')

app.keys = [config.key]

app.use(session({}, app))

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: config.uploadDir || osTmpdir(),
    keepExtensions: true,
    maxFieldsSize: '20M'
  }
}))

const _methods = _.union(methods, ['all'])
const Methods = _.zipObject(
  _methods,
  _.map(_methods, method => (path, action) => {
    app.use(koaRoute[method](path, action))
  })
)
const Use = function (fn) {
  app.use(fn)
}

Routes(Methods, Use)

app.listen(config.port, config.ip)

const infoIP = `Starting on:
  ${ip.address()}:${config.port}
  127.0.0.1:${config.port}
  ${config.ip}:${config.port}`

console.log(infoIP)
