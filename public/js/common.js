/* eslint-disable no-unused-vars */


function dateToStr(date,type) {
  let mid = '-' // 日期分割符
  let timeMide = ':' // 时间分割符
  let result = ''
  let format = function (num) {
    return (num >= 0 && num < 10)? ('0' + num) : num
  }
  let year = date.getFullYear(); //获取当前年份
  let mon = format(date.getMonth()+1); //获取当前月份
  let da = format(date.getDate()); //获取当前日
  let lastDate = new Date(year, date.getMonth()+1, 0)
  let h = format(date.getHours()); //获取小时
  let m = format(date.getMinutes()); //获取分钟
  let s = format(date.getSeconds()); //获取秒

  switch (type) {
    case "date": // yyyy-mm-dd
      result = year + mid + mon + mid + da;
      break;
    case "date_md": // mm-dd
      result = mon + mid + da;
      break;
    case "time": // HH:MM:SS
      result = h + timeMide + m + timeMide + s;
      break;
    case "time_hm": // HH:MM
      result = h + timeMide + m;
      break;
    case "m": // yyyy-mm-dd HH:MM
      result = year + mid + mon + mid + da + ' ' + h + timeMide + m;
      break;
    case "firstDate": // 当月第一天
      result = year + mid + mon + mid + '01';
      break;
    case "lastDate": // 当月最后一天
      result = year + mid + mon + mid + format(lastDate.getDate());
      break;
    default: // yyyy-mm-dd HH:MM:SS
      result = year + mid + mon + mid + da + ' ' + h + timeMide + m + timeMide + s;
  }
  return result
}

function get_$(key) {
  if(key[0] == '.') { // class
    return document.getElementsByClassName(key.substring(1))
  }
  return document.getElementById(key)
}