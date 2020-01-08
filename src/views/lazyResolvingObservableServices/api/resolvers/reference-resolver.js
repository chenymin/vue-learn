import Vue from 'vue'

export default function makeReferenceResolver ({ service }) {
  const result = Vue.observable({ data: null })
  let resolved = false

  return function referenceResolver (id) {
    if (resolved) return result

    resolved = true
    service.find(id).then(item => {
      result.data = item
    })

    return result
  }
}
