const { megaSena, search } = require('./schemas')

module.exports = async (fastify) => {
  fastify.get('/mega-sena/', { schema: search }, lotteryGetAllHandle)
  fastify.get('/mega-sena/:contest', { schema: search }, lotteryGetOneHandle)
  fastify.post('/mega-sena/', { schema: megaSena }, lotteryCreateHandle)
}

async function lotteryCreateHandle (request) {

  const model = request.body
  
  return await this.MegaSena.create(model)
}

async function lotteryGetAllHandle () {
  return await this.MegaSena.getAll()
}

async function lotteryGetOneHandle (request) {
  const contest = request.params.contest
  return await this.MegaSena.getOne(contest)
}