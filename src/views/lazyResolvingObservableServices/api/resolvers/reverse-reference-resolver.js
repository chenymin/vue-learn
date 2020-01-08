import Vue from 'vue'

export default function makeReverseReferenceResolver ({ service, type }) {
  const result = Vue.observable({ data: null, count: 0 })
  let resolved = false

  return function reverseReferenceResolver (_, { id }) {
    if (resolved) return result

    resolved = true
    service.referencedBy({ id, type }).then(items => {
      result.data = items
      result.count = items.length
    })

    return result
  }
}
