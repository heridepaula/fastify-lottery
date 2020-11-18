const { lotofacil, search } = require('./schemas')

module.exports = async (fastify) => {
  fastify.get('/lotofacil/', { schema: search }, lotteryGetAllHandle)
  fastify.get('/lotofacil/:contest', { schema: search }, lotteryGetOneHandle)
  fastify.post('/lotofacil/', { schema: lotofacil }, lotteryCreateHandle)
}

async function lotteryCreateHandle (request) {

  const model = request.body
  
  return await this.Lotofacil.create(model)
}

async function lotteryGetAllHandle () {
  return await this.Lotofacil.getAll()
}

async function lotteryGetOneHandle (request) {
  const contest = request.params.contest
  return await this.Lotofacil.getOne(contest)
}