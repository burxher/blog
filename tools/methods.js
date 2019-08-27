module.exports = {
  dateToStr: function(date,type) {
    let mid = '-'
    let timeMide = ':'
    let result = ''
    let format = function (num) {
      return (num >= 0 && num < 10)? ('0' + num) : num
    }
    let year = date.getFullYear(); //获取当前年份
    let mon = format(date.getMonth()+1); //获取当前月份
    let da = format(date.getDate()); //获取当前日
    let h = format(date.getHours()); //获取小时
    let m = format(date.getMinutes()); //获取分钟
    let s = format(date.getSeconds()); //获取秒

    switch (type) {
      case "date": // yyyy-mm-dd
        result = year + mid + mon + mid + da;
        break;
      case "time": // HH:MM:SS
        result = h + timeMide + m + timeMide + s;
        break;
      case "m": // yyyy-mm-dd HH:MM
        result = year + mid + mon + mid + da + ' ' + h + timeMide + m;
        break;
      default: // yyyy-mm-dd HH:MM:SS
        result = year + mid + mon + mid + da + ' ' + h + timeMide + m + timeMide + s;
    }
    return result
  }
}