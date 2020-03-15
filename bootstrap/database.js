module.exports = async (fastify) => {
  fastify
    .register(require('fastify-mongodb'), { url: process.env.MONGODB_URL, useNewUrlParser: true, forceClose: true })
}