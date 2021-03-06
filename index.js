if (process.env.NODE_ENV !== 'production') {
  require('dotenv-flow').config()
}

const logger = require('./bootstrap/logger')
const fastify = require('fastify')({ logger })

const fp = require('fastify-plugin')

fastify
  .register(fp(require('./bootstrap/database')))
  .register(fp(require('./bootstrap/server')))

const start = async () => {
  try {
      await fastify.listen(process.env.PORT, '0.0.0.0')
  } catch (err) {
    fastify.log.error({ application: 'lottery-api' }, err)
    process.exit(1)
  }
}

start()