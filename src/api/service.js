async function quickFetch (endpoint) {
  const response = await fetch(endpoint)
  const json = await response.json()
  return json
}

export default function makeService (endpoint) {
  return {
    async find (id) {
      return quickFetch(`${endpoint}/${id}`)
    },
    async list () {
      return quickFetch(endpoint)
    }
  }
}
