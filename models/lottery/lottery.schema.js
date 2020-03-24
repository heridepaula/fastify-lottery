const mongo = require('mongoose')
const Schema = mongo.Schema

const lotterySchema = new Schema({
  product: { type: String, required: true, enum : [ 'mega-sena', 'lotofacil', 'quina', 'lotomania'] },
  contest: { type: Number, required: true },
  date: { type: Date, required: true },
  result: { type: [ Number ], required: true },
  winners: { type: Number, required: true, default: 0 },
  prize: { type: Number, required: true, default: 0.0 },
  accumulated: { type: Boolean, required: true, default: true },
  accumulatedValue: { type: Number, required: true }
})

lotterySchema.index({ product: 1, contest: 1 }, { unique: true })

module.exports = lotterySchema