require('dotenv').config()

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const ETHEREUM_ADDRESSES = process.env.ETHEREUM_ADDRESSES

module.exports = {
  ETHERSCAN_API_KEY,
  ETHEREUM_ADDRESSES
}