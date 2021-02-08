const app = require('express')();
const bodyParser = require('body-parser');
const { tokenMiddleware } = require('./middlewares');
const TokenController = require('./token.controller');
const { PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/token-balance', tokenMiddleware, TokenController.getBalances);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));