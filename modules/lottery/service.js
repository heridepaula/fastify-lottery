class LotteryService {
  constructor (lotteryCollection) {
    this.lotteryCollection = lotteryCollection
  }

  async create (product, lottery) {
    try {
      lottery.product = product
      const result = await this.lotteryCollection.insertOne(lottery)
      return result.insertedId
    } catch (err) {
      throw err
    }
  }

  async getAll () {
    try {
      const result = await this.lotteryCollection.find()
      return result.toArray()
    } catch (err) {
      throw err
    }
  }

  async ensureIndexes (db) {
    await db.command({
      'collMod': this.lotteryCollection.collectionName,
      validator: {
        product: { $type: 'string'},
        contest: { $type: 'int' },
        date: { $type: 'date' },
        result: { $type: 'array' },
        winners: { $type: 'int' },
        prize: { $type: 'decimal' },
        accumulated: { $type: 'bool' },
        accumulatedValue: { $type: 'decimal' },
      }
    })
    await this.lotteryCollection.createIndex({ contest: 1 }, { unique: true })
  }
}

module.exports = LotteryService