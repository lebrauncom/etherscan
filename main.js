require('dotenv').config()
const axios = require('axios')
const numbro =require('numbro')

const ETHERSCAN_API_BASE_URL = 'https://api.etherscan.io'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const ETHEREUM_ADDRESSES = process.env.ETHEREUM_ADDRESSES

// api integration
const client = axios.create({
  baseURL: ETHERSCAN_API_BASE_URL,
  timeout: 5000,
})

const balance_query = `
  module=account&
  action=balancemulti&
  address=${ETHEREUM_ADDRESSES}&
  tag=latest&
  apikey=${ETHERSCAN_API_KEY}
`

const get = async (dirty_query) => {
  const query = dirty_query.replace(/(\r\n|\n|\r| )/gm, '')
  return await client.get(`/api?${query}`)
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
    console.log('Unable to handle data', { data })
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
