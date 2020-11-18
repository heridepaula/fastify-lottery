const fp = require('fastify-plugin')

module.exports = async (fastify) => {
  fastify
    .register(require('fastify-helmet'))
    .register(require('fastify-compress'), { global: false })
    .register(fp(require('../models/megasena')))
    .register(fp(require('../models/lotofacil')))
    .register(require('../modules/megasena'), { prefix: '/api/v1/' })
    .register(require('../modules/lotofacil'), { prefix: '/api/v1/' })
    .register(require('../modules/keep-alive'), { prefix: '/api/v1/' })
    .register(require('../cronjobs/megasena-sync'))
    .register(require('../cronjobs/lotofacil-sync'))
}