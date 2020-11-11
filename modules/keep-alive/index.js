module.exports = async (fastify) => {
  fastify.get('keep-alive', {}, async function () {
    return { success: true }
  })
}