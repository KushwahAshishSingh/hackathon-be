const transactionRouter = require('./transaction');

function initRoutes(app) {
  app.use('/transaction', transactionRouter);
}

module.exports = initRoutes;