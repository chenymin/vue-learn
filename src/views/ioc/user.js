// Usually a third party API.
const api = Promise.resolve([
  {
    id: 1,
    name: 'Antonia'
  },
  {
    id: 2,
    name: 'Anton'
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
