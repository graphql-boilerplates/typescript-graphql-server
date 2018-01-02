import { Graphcool } from './generated/graphcool'

export interface Context {
  db: Graphcool
  request: any
}