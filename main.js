require('dotenv').config()
const axios = require('axios')
const numbro =require('numbro')
const { ETHERSCAN_API_KEY, ETHEREUM_ADDRESSES } = require('./secrets')
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

const balance_query = query_builder({ 
  address: ETHEREUM_ADDRESSES, 
  apikey: ETHERSCAN_API_KEY 
})

const get = (query) => {
  return client.get(`/api?${query}`)
}

// format ethereum balance from integer to decimal
const to_pretty_balance = (val) => {
  return numbro(val)
    .divide(1000000000000000000)
    .format({ thousandSeparated: true, mantissa: 18 })
}

// render data to console
const render = (result=[]) => {
  result.forEach(r => {
    console.log(`${r.account} – ${to_pretty_balance(r.balance)}`)
  })
}

// handle what happens to data
const handle = (data) => {
  if (data.status === '1') {
    return render(data.result)
  }
  else {
    console.log('🔥', { data, query_string: balance_query })
  }
}

// Main
const main = async () => {
  await get(balance_query)
    .then(response => {
      handle(response.data)
    })
    .catch(err => {
      console.log({ err })
    })
}

main()
