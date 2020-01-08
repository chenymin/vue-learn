import makeService from './service'

const type = 'users'

export const schema = {
  id: x => x,
  name: x => x,
  username: x => x
}

export default makeService({ schema, type })
