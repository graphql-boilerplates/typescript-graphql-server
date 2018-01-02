import { GraphQLServer } from 'graphql-yoga'
import { Graphcool } from './generated/graphcool'
import { Context } from './utils'

const resolvers = {
  Query: {
    feed(parent, args, ctx: Context, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx: Context, info) {
      return ctx.db.mutation.createPost(
        // TODO remove `isPublished` in favour of default value
        { data: { title, text, isPublished: false } },
        info,
      )
    },
    publish(parent, { id }, ctx: Context, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Graphcool({
      endpoint: 'http://localhost:60000/graphql-boilerplate/dev',
      secret: 'mysecret123',
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
