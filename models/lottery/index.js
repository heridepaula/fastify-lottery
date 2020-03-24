const lotteryClass = require('./lottery.class')
const lotterySchema = require('./lottery.schema')

module.exports = async (fastify) => {
  const db = fastify.mongo.db

  lotterySchema.loadClass(lotteryClass)
  const Lottery = db.model('Lottery', lotterySchema)
  
  fastify.decorate('Lottery', Lottery)
}
