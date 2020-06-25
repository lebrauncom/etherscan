const numbro = require('numbro')

const object_keys_values_to_string = (obj, opts={}) => {
  if (Object.entries(opts).length === 0) {
    opts = { join: ',', sep: ':' }
  }
  
  return Object.keys(obj)
    .map(key => `${key}${opts.sep}${obj[key]}`)
    .join(opts.join)
}

// format ethereum balance from integer to decimal
const to_pretty_balance = (val) => {
  return numbro(val)
    .divide(1000000000000000000)
    .format({ thousandSeparated: true, mantissa: 18 })
}

module.exports = {
  object_keys_values_to_string,
  to_pretty_balance
}