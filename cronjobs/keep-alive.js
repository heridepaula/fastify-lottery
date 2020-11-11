'use strict'
const got = require('got')
const CronJob = require('cron').CronJob

module.exports = async () => {
  (new CronJob('* 20/20 * * * *', async () => {
    await got(`${process.env.FASTIFY_LOTTERY_URL}/api/v1/keep-alive`)
  }, null, true, 'America/Los_Angeles')).start()
}