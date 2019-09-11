const Overtime = require('../lib/mongo').Overtime

module.exports = {
  // 新增加班时间
  create: function(overtime) {
    return Overtime.create(overtime).exec()
  },

  // 获取指定（所有）日期的加班时间
  getOverTimeList: function(params) {
    const query = {}
    if (params) {
      // 查询人
      query.author = params.author 
      // 查询时间
      // "$gt" 、"$gte"、 "$lt"、 "$lte"（分别对应">"、 ">=" 、"<" 、"<="）
      let dateRange = {
        '$gte': new Date(params.startDate || '2019-08-14')
      }
      dateRange['$lt'] = params.endDate? new Date(params.endDate) : new Date()
      query.startTime = dateRange
    }
    console.log("获取指定（所有）日期的加班时间, 查询参数：",query)
    return Overtime
      .find(query)
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec()
  }

}
