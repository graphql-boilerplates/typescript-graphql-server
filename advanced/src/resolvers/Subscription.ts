import { Context } from '../utils'

export const Subscription = {
    feedSubscription: {
      subscribe: (parent, args, ctx: Context, info) => {
        return ctx.db.subscription.post({}, info)
      },
    },
  }
  
  // This is the same subscription as above but only fires for 
  // posts that have been published.
  // export const Subscription = {
  //   feedSubscription: {
  //     subscribe: (parent, args, ctx: Context, info) => {
  //       return ctx.db.subscription.post(
  //         {
  //           where: {
  //             node: {
  //               isPublished: true,
  //             },
  //           },
  //         },
  //         info,
  //       )
  //     },
  //   },
  // }
  