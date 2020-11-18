const lotofacilClass = require('./lotofacil.class')
const lotofacilSchema = require('./lotofacil.schema')

module.exports = async (fastify) => {
  const db = fastify.mongo.db

  lotofacilSchema.loadClass(lotofacilClass)
  const Lotofacil = db.model('Lotofacil', lotofacilSchema)
  
  fastify.decorate('Lotofacil', Lotofacil)
}
