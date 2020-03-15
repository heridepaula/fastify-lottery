const fp = require('fastify-plugin')

module.exports = async (fastify) => {
  fastify
    .register(require('fastify-helmet'))
    .register(require('fastify-compress'), { global: false })
    .register(fp(require('./decorator')))
    .register(require('../modules/lottery'), { prefix: '/api/v1/' })
}