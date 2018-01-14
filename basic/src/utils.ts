<<<<<<< HEAD
import { Prisma } from 'prisma-binding'
=======
import { Graphcool } from './generated/graphcool'
>>>>>>> a29ada294676b5c5b1ce467555b87096439ea182

export interface Context {
  db: Prisma
  request: any
}