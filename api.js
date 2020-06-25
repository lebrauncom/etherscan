const axios = require('axios')
const { object_keys_values_to_string } = require('./utils')

const ETHERSCAN_API_BASE_URL = 'https://api.etherscan.io'

// api integration
const client = axios.create({
  baseURL: ETHERSCAN_API_BASE_URL,
  timeout: 5000,
})

const query_builder = (dirty_query={}) => {
  const base_query = {
    module: 'account',
    action: 'balancemulti',
    address: '',
    tag: 'latest',
    apikey: ''
  }
  
  const query = {
    ...base_query,
    ...dirty_query
  }

  return object_keys_values_to_string(query, { join: '&', sep: '=' })
}

const get = (query) => {
  return client.get(`/api?${query}`)
}

module.exports = {
  get,
  query_builder
}