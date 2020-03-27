import { ApolloServer, PubSub } from 'apollo-server-express';
import { createServer } from 'http';
import { createKnexCRUDRuntimeServices, CRUDService } from '@graphback/runtime-knex'
import express from 'express';
import Knex from 'knex';
import resolvers from './generated/resolvers';
import { models } from './generated/models';
import { getProjectConfig } from './utils';

async function start() {
  const app = express()

  const projectConfig = await getProjectConfig()
  const schema = await projectConfig.getSchema()
  const typeDefs = await projectConfig.getSchema('DocumentNode')

  const db = Knex({
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    }
  })

  const pubSub = new PubSub()

  const context = createKnexCRUDRuntimeServices(models, schema, db, pubSub)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
  })

  apolloServer.applyMiddleware({ app, path: '/' });

  const httpServer = createServer(app)

  httpServer.listen(
    { port: 4000 },
    () => console.log(`Server is running on http://localhost:4000/`)
  )
}

start()