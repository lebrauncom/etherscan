require('dotenv').config()
const { get, is_ok, query_builder } = require('./api')
const { ETHERSCAN_API_KEY, ETHEREUM_ADDRESSES } = require('./secrets')
const { to_pretty_balance } = require('./utils')

// render data to console
const render = (result=[]) => {
  result.forEach(r => {
    console.log(`${r.account} – ${to_pretty_balance(r.balance)}`)
  })
}

// handle response
const handle = (response) => {
  is_ok(response) ? success(response.data) : fail(response)
}

// handle success
const success = (data) => {
  render(data.result)
}

// handle fail
const fail = (response) => {
  console.log('🔥', { response })
}

// Main
const main = async () => {
  try {
    const balance_query = query_builder({ 
      address: ETHEREUM_ADDRESSES, 
      apikey: ETHERSCAN_API_KEY 
    })

    const res = await get(balance_query)
    handle(res)
  }
  catch (err) {
    console.log({ err })
  }
}

main()
