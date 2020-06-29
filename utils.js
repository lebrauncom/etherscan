const object_keys_values_to_string = (obj, opts={}) => {
  if (Object.entries(opts).length === 0) {
    opts = { join: ',', sep: ':' }
  }
  
  return Object.keys(obj)
    .map(key => `${key}${opts.sep}${obj[key]}`)
    .join(opts.join)
}

// format ethereum balance from integer to decimal
const to_pretty_balance = (int_val) => {
  return `${int_val.substring(0, 1)}.${int_val.substring(1)}`
}

module.exports = {
  object_keys_values_to_string,
  to_pretty_balance
}