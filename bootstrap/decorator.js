const Lottery = require('../models/lottery')

module.exports = async (fastify) => {
  fastify.decorate('lotteryService', Lottery)
}