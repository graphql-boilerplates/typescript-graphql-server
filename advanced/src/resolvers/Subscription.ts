import { Context } from '../utils'

export const Subscription = {
  feedSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe
        .post({
          mutation_in: ['CREATED', 'UPDATED'],
        })
        .node()
    },
    resolve: payload => {
      return payload
    },
  },
}
