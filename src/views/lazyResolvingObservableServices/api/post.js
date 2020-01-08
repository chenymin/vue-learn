import makeService from './service'
import makeReferenceResolver from './resolvers/reference-resolver'
import makeReverseReferenceResolver from './resolvers/reverse-reference-resolver'
import commentService from './comment'
import userService, { schema as userSchema } from './user'

const type = 'posts'

export const schema = {
  id: x => x,
  title: x => x,
  body: x => x,
  comments: makeReverseReferenceResolver({
    service: commentService,
    type
  }),
  user: {
    field: 'userId',
    resolver: makeReferenceResolver({
      schema: userSchema,
      service: userService
    })
  }
}

export default makeService({ schema, type })
