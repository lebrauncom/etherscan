const { object_keys_values_to_string, to_pretty_balance } = require('../utils')

describe('object_keys_values_to_string', () => {
  it('renders an object as a formatted string', () => {
    const obj = { foo: 'bar', baz: 'quux' }
    const actual = object_keys_values_to_string(obj)
    expect(actual).toEqual('foo:bar,baz:quux')
  })

  it('accepts custom separator and delimiter to format string', () => {
    const obj = { foo: 'bar', baz: 'quux' }
    const actual = object_keys_values_to_string(obj, { join: '&', sep: '=' })
    expect(actual).toEqual('foo=bar&baz=quux')
  })
})

describe('to_pretty_balance', () => {
  it('renders an integer as an Ethereum formatted balance', () => {
    const actual = to_pretty_balance('7604813686718592064')
    expect(actual).toEqual('7.604813686718592064')
  })
})