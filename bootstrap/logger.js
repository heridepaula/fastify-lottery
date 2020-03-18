const bunyan = require('bunyan')
const Elasticsearch = require('bunyan-elasticsearch')
const application = require('../package.json')

const esStream = new Elasticsearch({
  indexPattern: '[logstash-]YYYY.MM.DD',
  type: 'logs',
  host: 'elasticsearch:9200'
})

esStream.on('error', function (err) {
  console.log('Elasticsearch Stream Error:', err.stack)
})

const logger = bunyan.createLogger({
  name: application.name,
  streams: [
    { stream: process.stdout },
    { stream: esStream }
  ],
  serializers: bunyan.stdSerializers
})

module.exports = logger