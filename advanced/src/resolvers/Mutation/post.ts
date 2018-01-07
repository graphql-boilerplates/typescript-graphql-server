import { getUserId, Context } from '../../utils'

export const post = {
  async writePost(parent, { title, text }, ctx: Context, info) {
    const authorId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          // publish post by default
          isPublished: true,
          title,
          text,
          author: {
            connect: { id: authorId },
          },
        },
      },
      info,
    )
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const authorId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: authorId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({ where: { id } })
  },
}
