const path = require('path')
const fs = require('fs')

const envFile = path.join(__dirname, './.env')

if (fs.existsSync(envFile)) {
  require('node-env-file')(envFile)
}

const Config = {
  port: process.env.API_PORT || 9502,
  ip: process.env.IP || '0.0.0.0',
  key: process.env.KEY || 'a98c50f39bd3dc6ac144f024f96ae3a24aa92840',
  database: process.env.DATABASE || 'localhost/nugo-restaurant'
}

module.exports = Config
