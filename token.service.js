const { eth, ...tokensInfo } = require('./tokensInfo.json')
const Web3 = require('web3');
const abi = require('./ERC20.json');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));

const tokens = Object.entries(tokensInfo).map(([name, { address, decimals }]) => 
  ({ name, decimals, contract: new web3.eth.Contract(abi, address) }));

class TokenService {

  static balancePromise(batch, user, { contract, decimals, name }) {
    return new Promise(((resolve, reject) => {
      batch.add(contract.methods.balanceOf(user).call.request({}, (err, balance) => {
        err ? reject(err) : resolve({ [name]: balance / Math.pow(10, decimals) })
      }))
    }));
  }

  static async getBalances(user) {
    const batch = new web3.BatchRequest();
    const promises = tokens.map(this.balancePromise.bind(null, batch, user));
    promises.unshift(
      new Promise((resolve, reject) => {
        batch.add(web3.eth.getBalance.request(user, 'latest',(err, balance) => {
          err ? reject(err) : resolve({ eth: balance / Math.pow(10, eth.decimals) })}));
      }));
    batch.execute();
    return { status: true, data: (await Promise.all(promises)).reduce((acc, item) => ({ ...acc, ...item }), {})};
  }
}

module.exports = TokenService;