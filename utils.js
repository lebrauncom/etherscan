const object_keys_values_to_string = (obj, opts={}) => {
  if (Object.entries(opts).length === 0) {
    opts = { join: ',', sep: ':' }
  }
  
  return Object.keys(obj)
    .map(key => `${key}${opts.sep}${obj[key]}`)
    .join(opts.join)
}

module.exports = {
  object_keys_values_to_string
}