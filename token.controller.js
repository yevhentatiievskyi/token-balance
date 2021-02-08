const { exec } = require('./utils');
const TokenService = require('./token.service');

class TokenController {
  static getBalances(req, res){
    exec(TokenService.getBalances.bind(TokenService, req.user), res);
  }
}

module.exports = TokenController;