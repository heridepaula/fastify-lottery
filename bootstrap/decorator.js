const LotteryService = require('../modules/lottery/service')

module.exports = async (fastify) => {
  const db = fastify.mongo.db

  const lotteryCollection = await db.createCollection('lottery')
  const lotteryService = new LotteryService(lotteryCollection)

  await lotteryService.ensureIndexes(db)

  fastify.decorate('lotteryService', lotteryService)
}