require('dotenv').config()
const { get, query_builder } = require('./api')
const { ETHERSCAN_API_KEY, ETHEREUM_ADDRESSES } = require('./secrets')
const { to_pretty_balance } = require('./utils')

// render data to console
const render = (result=[]) => {
  result.forEach(r => {
    console.log(`${r.account} – ${to_pretty_balance(r.balance)}`)
  })
}

// handle what happens to data
const handle = (data) => {
  if (data.status === '1') {
    render(data.result)
  }
  else {
    console.log('🔥', { data, query_string: balance_query })
  }
}

// Main
const main = () => {
  const balance_query = query_builder({ 
    address: ETHEREUM_ADDRESSES, 
    apikey: ETHERSCAN_API_KEY 
  })

  get(balance_query)
    .then(response => {
      handle(response.data)
    })
    .catch(err => {
      console.log({ err })
    })
}

main()
