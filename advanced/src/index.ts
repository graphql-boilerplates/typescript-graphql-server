import { ApolloServer, PubSub } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import { createMongoCRUDRuntimeContext } from '@graphback/runtime-mongo'
import resolvers from './resolvers/resolvers';
import { models } from './resolvers/models';
import { getProjectConfig, connectDB } from './utils';

async function start() {
  const app = express()

  const config = await getProjectConfig()
  const typeDefs = await config.getSchema('DocumentNode')
  const schema = await config.getSchema()

  const db = await connectDB('users');
  const pubSub = new PubSub()

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: context =>({
      ...context,
      ...createMongoCRUDRuntimeContext(models, schema, db, pubSub)
    })
  })

apolloServer.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

httpServer.listen(
  { port },
  () => console.log(`Server is running on http://localhost:${port}/graphql`)
)
}

start()