const Overtime = require('../lib/mongo').Overtime

module.exports = {
  // 新增加班时间
  create: function(overtime) {
    return Overtime.create(overtime).exec()
  },

  // 获取指定（所有）日期的加班时间
  getOverTimeList: function(day) {
    const query = {}
    if (day) {
      query.startTime = new Date(day)
    }
    return Overtime
      .find(query)
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec()
  }

}
