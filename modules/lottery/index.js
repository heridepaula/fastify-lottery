const { lottery, search } = require('./schemas')

module.exports = async (fastify) => {
  fastify.get('/:product/', { schema: search }, lotteryGetAllHandle)
  fastify.post('/:product/', { schema: lottery }, lotteryCreateHandle)
}

async function lotteryCreateHandle (request, reply) {
  const product = request.params.product
  const obj = request.body

  const result = await this.lotteryService.create(product, obj)
  return reply.send({ _id: result })
}

async function lotteryGetAllHandle (request, reply) {
  const product = request.params.product
  const result = await this.lotteryService.getAll(product)
  return result
}