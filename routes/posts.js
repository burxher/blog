const express = require('express')
const router = express.Router()

const checkLogin = require('../middleware/check').checkLogin
const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const OvertimeModel = require('../models/overtime')
const methods = require('../tools/methods')
const overtimeFormat = require('../tools/overtimeFun').overtimeFormat

// 文章页
router.get('/', function (req, res, next) {
  const author = req.query.author
  const user = req.session.user ? req.session.user._id : null

  Promise.all([
    PostModel.getPosts(author),
    // 加班时间
    OvertimeModel.getOverTimeList({
      author: user,
      // 当月第一天时间-现在
      startDate: methods.dateToStr(new Date(), 'firstDate')
    })
  ])
  .then( result => {
    // 博文
    const posts = result[0]

    // 加班时间
    let overtime = overtimeFormat(result[1])

    // 渲染
    res.render('posts', {
      posts: posts,
      overtime: overtime
    })
  })
  .catch(next)
})

// 发表文章
router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  let post = {
    author: author,
    title: title,
    content: content
  }

  PostModel.create(post)
    .then((result) => {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0]
      req.flash('success', '发表成功')
      // 发表成功后跳转到该文章页
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)
})
// 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

// 文章详情页
router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId), // 获取文章信息
    CommentModel.getComments(postId), // 获取该文章所有留言
    PostModel.incPv(postId) // pv 加 1
  ])
    .then((result) => {
      const post = result[0]
      const comments = result[1]
      if (!post) {
        throw new Error('该文章不存在')
      }

      res.render('post', {
        post: post,
        comments: comments
      })
    }).catch(next)
})

// 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getRawPostById(postId)
    .then((post) => {
      if (!post) {
        throw new Error('该文章不存在')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足')
      }
      res.render('edit', {
        post: post
      })
    })
    .catch(next)
})

// 更新文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('没有权限')
      }
      PostModel.updatePostById(postId, { title: title, content: content })
        .then(function () {
          req.flash('success', '编辑文章成功')
          // 编辑成功后跳转到上一页
          res.redirect(`/posts/${postId}`)
        })
        .catch(next)
    })
})

// 删除文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('没有权限')
      }
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', '删除文章成功')
          // 删除成功后跳转到主页
          res.redirect('/posts')
        })
        .catch(next)
    })
})

module.exports = router