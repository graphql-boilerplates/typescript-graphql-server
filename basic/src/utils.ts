import { Prisma } from 'prisma-binding'

export interface Context {
  db: Prisma
  request: any
}