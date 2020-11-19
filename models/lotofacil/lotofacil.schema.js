const mongo = require('mongoose')
const Schema = mongo.Schema

const lotofacilSchema = new Schema({
  contest: { type: Number, required: true, index: { unique: true } },
  date: { type: Date, required: true },
  result: { type: [ Number ], required: true },
  fifteenNumbersWinners: { type: Number, required: true, default: 0 },
  fifteenNumbersPrize: { type: Number, required: true, default: 0.0 },
  fourteenNumbersWinners: { type: Number, required: true, default: 0 },
  fourteenNumbersPrize: { type: Number, required: true, default: 0.0 },
  thirteenNumbersWinners: { type: Number, required: true, default: 0 },
  thirteenNumbersPrize: { type: Number, required: true, default: 0.0 },
  twelveNumbersWinners: { type: Number, required: true, default: 0 },
  twelveNumbersPrize: { type: Number, required: true, default: 0.0 },
  elevenNumbersWinners: { type: Number, required: true, default: 0 },
  elevenNumbersPrize: { type: Number, required: true, default: 0.0 },
  accumulated: { type: Boolean, required: true, default: true },
  accumulatedValue: { type: Number, required: true }
})

lotofacilSchema.index({ contest: 1 }, { unique: true })

module.exports = lotofacilSchema