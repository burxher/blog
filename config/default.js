module.exports = {
  port: 3000,
  session: {
    secret: 'blog',
    key: 'blog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/blog'
  // mongodb: 'mongodb+srv://burcher:Zxcvbnm1@blog-nr5hl.mongodb.net/test?retryWrites=true&w=majority'
}
