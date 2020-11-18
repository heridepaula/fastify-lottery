class Lotofacil {
  static async getAll () {
    try {
      return this.find().sort({contest: 'descending'})
    } catch (ex) {
      throw ex
    }
  }

  static async getOne (contest) {
    try {
      return this.find({ contest })
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = Lotofacil