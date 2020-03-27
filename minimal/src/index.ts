import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => {
      const returnValue = `Hello ${name || 'World!'}`
      return returnValue
    }
  }
}

const app = express()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

apolloServer.applyMiddleware({ app, path: '/' });

const httpServer = createServer(app)

httpServer.listen(
  { port: 4000 },
  () => console.log(`Server is running on http://localhost:4000/`)
)
