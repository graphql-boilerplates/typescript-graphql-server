import * as jwt from 'jsonwebtoken'
import { loadConfig } from 'graphql-config'
import { MongoClient } from 'mongodb'

export interface Context {
  request: any
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export async function connectDB(databaseName: string) {
  const client = new MongoClient(process.env.MONGODB_CONNECTION_URL, { useUnifiedTopology: true })
  await client.connect();

  return client.db(databaseName)
}

export async function getProjectConfig() {
  const projectConfig = await loadConfig({
    rootDir: process.cwd(),
    extensions: [
      () => ({ name: 'graphback' })
    ]
  });

  return projectConfig.getDefault();
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
