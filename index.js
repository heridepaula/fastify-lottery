require('dotenv-flow').config()

const fastify = require('fastify')({ logger: { prettyPrint: true }})
const fp = require('fastify-plugin')

fastify
  .register(fp(require('./bootstrap/database')))
  .register(fp(require('./bootstrap/server')))

const start = async () => {
  try {
    await fastify.listen(process.env.PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()