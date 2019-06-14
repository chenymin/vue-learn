// Usually a third party API.
const api = Promise.resolve([
  {
    id: 1,
    title: 'Some stuff'
  },
  {
    id: 2,
    title: 'Some other stuff'
  }
])

export default {
  async find (id) {
    const result = await api
    return result.find(x => x.id === id)
  },
  async list () {
    return api
  }
}
