import { Query } from './Query'
import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { User } from './User'
import { Post } from './Post'

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  Subscription,
  User,
  Post,
}
