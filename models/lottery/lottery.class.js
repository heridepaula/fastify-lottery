class Lottery {
  static async getAll (product) {
    try {
      return this.find({ product })
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