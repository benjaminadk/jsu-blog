const brcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { getSignedUrl } = require('../services/aws')

module.exports = {
  signup: async (_, args, ctx, info) => {
    // 1. Normalize email for comparison
    const email = args.email.trim().toLowerCase()
    // 2. Check if user with email already exists
    const userExists = await ctx.prisma.$exists.user({ email })
    // 3. If exists throw error
    if (userExists) {
      throw new Error(`User exists for ${email}`)
    }
    // 4. Hash password
    const hashedPassword = await brcrypt.hash(args.password, 10)
    try {
      // 5. Hash email, assign image gravatar with fallback
      const hashedEmail = md5(email)
      const image = `https://www.gravatar.com/avatar/${hashedEmail}?d=mp`
      // 6. Create user
      const user = await ctx.prisma.createUser({
        name: args.name,
        email,
        password: hashedPassword,
        image
      })
      // 7. Create token with user id
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
      // 8. Send cookie with token inside
      ctx.res.cookie(process.env.COOKIE, token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 30
      })
      // 9. Return payload
      return { success: true, message: 'User signed up.' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  signin: async (_, args, ctx, info) => {
    // 1. Normalize email
    const email = args.email.trim().toLowerCase()
    // 2. Look up user in db
    const user = await ctx.prisma.user({ email })
    // 3. If no user throw error
    if (!user) {
      throw new Error(`No User for ${email}.`)
    }
    // 4. Check if password matches
    const isMatch = await brcrypt.compare(args.password, user.password)
    // 5. If no match throw error
    if (!isMatch) {
      throw new Error('Invalid password.')
    }
    // 6. Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    // 7. Send cookie with token inside
    ctx.res.cookie(process.env.COOKIE, token, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 30
    })
    // 8. Return payload
    return { success: true, message: 'User signed in.' }
  },

  signout: async (_, args, ctx, info) => {
    ctx.res.clearCookie(process.env.COOKIE)
    return { success: true, message: 'User signed out.' }
  },

  signS3: async (_, args, ctx, info) => {
    const Bucket = process.env.AWS_BUCKET
    const params = {
      Bucket,
      Key: args.filename,
      Expires: 60,
      ContentType: args.filetype
    }
    try {
      const requestUrl = await getSignedUrl('putObject', params)
      const imageUrl = `https://${Bucket}.s3.amazonaws.com/${args.filename}`
      return { requestUrl, imageUrl }
    } catch (error) {
      console.log(error)
    }
  },

  updateUser: async (_, args, ctx, info) => {
    // 1. Gather properties to update
    const data = {}
    for (let x in args) {
      data[x] = args[x]
    }
    // 2. Update user based on context
    try {
      await ctx.prisma.updateUser({ where: { id: ctx.userId }, data })
      return { success: true, message: 'User updated.' }
    } catch (error) {
      console.log(error)
    }
  },

  createPost: async (_, args, ctx, info) => {
    try {
      const post = await ctx.prisma.createPost({
        author: { connect: { id: ctx.userId } }
      })
      return { success: true, message: 'Post created.', id: post.id }
    } catch (error) {
      console.log(error)
    }
  }
}
