const _ = require('lodash')

const Sanitizer = (val, addQuotes = true) => {
  if (_.isObject(val)) {
    return _.map(val, (value, key) => Sanitizer(value, false))
  } else {
    return addQuotes ? `'${val.toString().replace(/'/g, "''")}'` : `${val.toString().replace(/'/g, "''")}`
  }
}

module.exports = Sanitizer
