import { GraphQLServer } from 'graphql-yoga'
<<<<<<< HEAD
import { importSchema } from 'graphql-import'
import { Prisma } from 'prisma-binding'
=======
import { Graphcool } from './generated/graphcool'
>>>>>>> a29ada294676b5c5b1ce467555b87096439ea182
import { Context } from './utils'

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
    drafts(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: false } }, info)
    },
    post(parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id: id } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx, info) {
      return ctx.db.mutation.createPost(
        { data: { title, text, isPublished: false } },
        info,
      )
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({where: { id } }, info)
    },
    publish(parent, { id }, ctx, info) {
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
<<<<<<< HEAD
    db: new Prisma({
      schemaPath: './database/schema.generated.graphql',
      endpoint: 'http://localhost:60000/graphql-boilerplate/dev',
=======
    db: new Graphcool({
      endpoint: '__GRAPHCOOL_ENDPOINT__',
>>>>>>> a29ada294676b5c5b1ce467555b87096439ea182
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
