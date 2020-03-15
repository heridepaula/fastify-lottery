const result = {
  body: {
    type: 'object',
    require: [ 'contest', 'date', 'result', 'winners', 'prize', 'accumulated', 'accumulatedValue' ],
    properties: {
      contest: { type: 'integer' },
      date: { type: 'string', format: 'date' },
      result: { 
        type: 'array',
        items: { type: 'integer' }
      },
      winners: { type: 'integer' },
      prize: { type: 'number' },
      accumulated: { type: 'boolean' },
      accumulatedValue: { type: 'number' },
    },
    additionalProperties: false
  },
  response: {
    200: {
      additionalProperties: false,
      properties: {
        _id: { type: "string" }
      }
    }
  }
}

const resultsOutput = {
  type: 'object',
  require: [ '_id', 'contest', 'date', 'result', 'winners', 'prize', 'accumulated', 'accumulatedValue' ],
  properties: {
    _id: { type: 'string' },
    contest: { type: 'integer' },
    date: { type: 'string', format: 'date' },
    result: { 
      type: 'array',
      items: { type: 'integer' }
    },
    winners: { type: 'integer' },
    prize: { type: 'number' },
    accumulated: { type: 'boolean' },
    accumulatedValue: { type: 'number' },
  }
}

const search = {
  response: {
    200: {
      type: 'array',
      items: resultsOutput
    }
  }
}

module.exports = { result, search }