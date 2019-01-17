const { prisma } = require('../generated')
const UserWithPosts = require('../fragments/UserWithPosts')

module.exports = async (req, res, next) => {
  if (!req.userId) return next()
  const user = await prisma.user({ id: req.userId }).$fragment(UserWithPosts)
  req.user = user
  next()
}
