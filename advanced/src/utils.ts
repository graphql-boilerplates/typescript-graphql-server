import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma'

export interface Context {
  db: Prisma
  request: any
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    try {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
      return userId
    } catch (e) {
      throw new Error('Invalid Token')
    }
  }

  throw new Error('Not authorized')
}
