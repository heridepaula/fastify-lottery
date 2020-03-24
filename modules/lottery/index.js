const { lottery, search } = require('./schemas')

module.exports = async (fastify) => {
  fastify.get('/:product/', { schema: search }, lotteryGetAllHandle)
  fastify.get('/:product/:contest', { schema: search }, lotteryGetOneHandle)
  fastify.post('/:product/', { schema: lottery }, lotteryCreateHandle)
}

async function lotteryCreateHandle (request, reply) {

  const product = request.params.product
  const model = request.body
  
  model.product = product
  
  return await this.Lottery.create(model)
}

async function lotteryGetAllHandle (request, reply) {
  const product = request.params.product
  return await this.Lottery.getAll(product)
}

async function lotteryGetOneHandle (request, reply) {
  const product = request.params.product
  const contest = request.params.contest
  return await this.Lottery.getOne(product, contest)
}