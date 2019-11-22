/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function changeTab(index) {
  // 激活 tab 颜色
  var tabArr = get_$('.tab-item')
  for(var i = 0; i < tabArr.length; i++) {
    tabArr[i].style.background = '#ebebeb'
    tabArr[i].style.borderBottom = "none"
  }
  tabArr[index].style.background = '#d3d8d6'
  tabArr[index].style.borderBottom = "0.5rem solid #4fc98d"

  // 记录当前 tab 索引
  var tabs = get_$('time-tab')
  tabs.setAttribute('data-index', index)

  // 切换 tab 页面
  if(index == 0) {
    get_$('setting-today').style.display = 'block'
    get_$('setting-other-time').style.display = 'none'
  } else if (index == 1) {
    get_$('endT').style.background = ''
    get_$('setting-today').style.display = 'none'
    get_$('setting-other-time').style.display = 'block'
  }
}

function formSubmit() {
  var startT = get_$('startT')
  var endT = get_$('endT')
  // 获取当前 tab 索引
  var tabIndex = get_$('time-tab').getAttribute('data-index')

  if(tabIndex == 0 && startT.value && endT.value) {
    var starttime = document.getElementsByName('starttime')[0]
    var endtime = document.getElementsByName('endtime')[0]
    var nowDate = dateToStr(new Date(), 'date')
    starttime.value = nowDate + ' ' + startT.value
    endtime.value = nowDate + ' ' + endT.value
    console.log(starttime.value,endtime.value)
  }

  var form = get_$('overtime-form')
  form.submit()
}

window.onload = function() {
  var nowTime = dateToStr(new Date(), 'time_hm')
  get_$('endT').value = nowTime
}