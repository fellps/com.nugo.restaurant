const _ = require('lodash')

const sanitizer = (val, addQuotes = true) => {
  if (_.isObject(val)) {
    return _.map(val, (value, key) => sanitizer(value, false))
  } else {
    return addQuotes ? `'${val.toString().replace(/'/g, "''")}'` : `${val.toString().replace(/'/g, "''")}`
  }
}

module.exports = sanitizer
