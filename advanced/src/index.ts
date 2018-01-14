import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Prisma } from 'prisma-binding'
import resolvers from './resolvers'

const typeDefs = importSchema('./src/schema.graphql')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      schemaPath: './database/schema.generated.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
