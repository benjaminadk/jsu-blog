const PostWithAuthor = require('../fragments/PostWithAuthor')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  post: async (_, args, ctx, info) =>
    await ctx.prisma.post({ id: args.id }).$fragment(PostWithAuthor),

  publication: async (_, args, ctx, info) => await ctx.prisma.publication({ id: args.id })
}
