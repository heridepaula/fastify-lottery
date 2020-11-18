const megaSenaClass = require('./megasena.class')
const megaSenaSchema = require('./megasena.schema')

module.exports = async (fastify) => {
  const db = fastify.mongo.db

  megaSenaSchema.loadClass(megaSenaClass)
  const MegaSena = db.model('MegaSena', megaSenaSchema)
  
  fastify.decorate('MegaSena', MegaSena)
}
