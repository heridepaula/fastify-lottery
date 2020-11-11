const fp = require('fastify-plugin')

module.exports = async (fastify) => {
  fastify
    .register(require('fastify-helmet'))
    .register(require('fastify-compress'), { global: false })
    .register(fp(require('../models/lottery')))
    .register(require('../modules/lottery'), { prefix: '/api/v1/' })
    .register(require('../modules/keep-alive'), { prefix: '/api/v1/' })
    .register(require('../cronjobs/keep-alive'))
}