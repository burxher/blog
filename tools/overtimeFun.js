const dateToStr = require('./methods').dateToStr
module.exports = {
	overtimeFormat: function(timeList) {
		// 加班时间
		let totalHours = 0
		let nowTime = dateToStr(new Date(),"m") // 当前时间
		timeList.forEach(el => {
			el.hours = ((el.endTime - el.startTime)/1000/3600).toFixed(1)
			console.log(el.hours + " " + typeof(el.hours))
			totalHours += Number(el.hours)
			el.date = dateToStr(el.startTime, 'date_md')
			el.startTime = dateToStr(el.startTime, 'time_hm')
			el.endTime = dateToStr(el.endTime, 'time_hm')
		});
		if(timeList.length>=5) {
			timeList = timeList.splice(0,5)
		}
		console.log(typeof totalHours)
		let overtime = {
			totalHours: totalHours.toFixed(1),
			now: nowTime,
			timeList: timeList
		}
		return overtime
	}
}