const result = {
  body: {
    type: 'object',
    require: [ 'contest', 'date', 'result', 'fifteenNumbersWinners', 'fifteenNumbersPrize', 'fourteenNumbersWinners', 'fourteenNumbersPrize', 'thirteenNumbersWinners', 'thirteenNumbersPrize', 'twelveNumbersWinners', 'twelveNumbersPrize', 'elevenNumbersWinners', 'elevenNumbersPrize', 'accumulated', 'accumulatedValue' ],
    properties: {
      contest: { type: 'integer' },
      date: { type: 'string', format: 'date' },
      result: { 
        type: 'array',
        items: { type: 'integer' }
      },
      fifteenNumbersWinners: { type: 'integer' },
      fifteenNumbersPrize: { type: 'number' },
      fourteenNumbersWinners: { type: 'integer' },
      fourteenNumbersPrize: { type: 'number' },
      thirteenNumbersWinners: { type: 'integer' },
      thirteenNumbersPrize: { type: 'number' },
      twelveNumbersWinners: { type: 'integer' },
      twelveNumbersPrize: { type: 'number' },
      elevenNumbersWinners: { type: 'integer' },
      elevenNumbersPrize: { type: 'number' },
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
  require: [ '_id', 'contest', 'date', 'result', 'fifteenNumbersWinners', 'fifteenNumbersPrize', 'fourteenNumbersWinners', 'fourteenNumbersPrize', 'thirteenNumbersWinners', 'thirteenNumbersPrize', 'twelveNumbersWinners', 'twelveNumbersPrize', 'elevenNumbersWinners', 'elevenNumbersPrize', 'accumulated', 'accumulatedValue' ],
  properties: {
    _id: { type: 'string' },
    contest: { type: 'integer' },
    date: { type: 'string', format: 'date' },
    result: { 
      type: 'array',
      items: { type: 'integer' }
    },
    fifteenNumbersWinners: { type: 'integer' },
    fifteenNumbersPrize: { type: 'number' },
    fourteenNumbersWinners: { type: 'integer' },
    fourteenNumbersPrize: { type: 'number' },
    thirteenNumbersWinners: { type: 'integer' },
    thirteenNumbersPrize: { type: 'number' },
    twelveNumbersWinners: { type: 'integer' },
    twelveNumbersPrize: { type: 'number' },
    elevenNumbersWinners: { type: 'integer' },
    elevenNumbersPrize: { type: 'number' },
    accumulated: { type: 'boolean' },
    accumulatedValue: { type: 'number' },
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