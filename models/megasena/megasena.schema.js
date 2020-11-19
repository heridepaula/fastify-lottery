const mongo = require('mongoose')
const Schema = mongo.Schema

const megaSenaSchema = new Schema({
  contest: { type: Number, required: true, index: { unique: true } },
  date: { type: Date, required: true },
  result: { type: [ Number ], required: true },
  sixNumbersWinners: { type: Number, required: true, default: 0 },
  sixNumbersPrize: { type: Number, required: true, default: 0.0 },
  fiveNumbersWinners: { type: Number, required: true, default: 0 },
  fiveNumbersPrize: { type: Number, required: true, default: 0.0 },
  fourNumbersWinners: { type: Number, required: true, default: 0 },
  fourNumbersPrize: { type: Number, required: true, default: 0.0 },
  accumulated: { type: Boolean, required: true, default: true },
  accumulatedValue: { type: Number, required: true }
})

module.exports = megaSenaSchema