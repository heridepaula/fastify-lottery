class Lottery {
  static async getAll (product) {
    try {
      return this.find({ product }).sort({contest: 'descending'})
    } catch (ex) {
      throw ex
    }
  }

  static async getOne (product, contest) {
    try {
      return this.find({ product, contest })
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = Lottery