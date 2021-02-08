const { STATUS_CODES } = require('http');
const tokenMiddleware = function (req, res, next) {
  const currentUser = req.query.user;
  if(currentUser){
    req.user = currentUser;
    return next();
  }
  res.status(400).send({ message: STATUS_CODES[400], status: false });
}
module.exports = { tokenMiddleware }