module.exports = async (fastify) => {
  fastify
    .register(require('fastify-mongoose'), { uri: process.env.MONGODB_URL, useNewUrlParser: true, forceClose: true })
}