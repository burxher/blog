const express = require('express')
const router = express.Router()
const OverTimeModel = require('../models/overtime')
const overtimeFormat = require('../tools/overtimeFun').overtimeFormat
const methods = require('../tools/methods')
router.get('/', function (req, res, next) {
  const user = req.session.user ? req.session.user._id : null
  // 加班时间
  OverTimeModel.getOverTimeList({
    author: user,
    // 当月第一天时间-现在
    startDate: methods.dateToStr(new Date(), 'firstDate')
  }).then(result => {
    // 加班时间
    let overtime = overtimeFormat(result)
    console.log("加班时间：", overtime)

    // 渲染
    res.render('overtime', {
      overtime: overtime
    })
  })
})
router.post('/', (req, res, next) => {
  let author = req.session.user._id
  let startTime = req.fields.starttime
  let endTime = req.fields.endtime
  // 时间格式
  let reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d$/;
  let regExp = new RegExp(reg);

  try {
    if(!regExp.test(startTime)) {
      throw new Error('开始加班时间格式错误')
    }
    if(!regExp.test(endTime)) {
      throw new Error('加班结束时间格式错误')
    }
    if(new Date(startTime) > new Date(endTime)) {
      throw new Error('加班结束时间小于开始时间')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('/posts')
  }
  let overtime = {
    author: author,
    startTime: new Date(startTime),
    endTime: new Date(endTime)
  }
  OverTimeModel.create(overtime)
    .then( () => {
      req.flash('success', '加班完成，你很棒哦！')
      res.redirect('/posts')
    })
    .catch(next)
})

module.exports = router