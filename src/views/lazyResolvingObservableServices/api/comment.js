import makeService from './service'

const type = 'comments'

export const schema = {
  id: x => x,
  name: x => x,
  body: x => x
}

export default makeService({ schema, type })
