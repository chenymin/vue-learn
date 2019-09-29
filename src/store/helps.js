export function normalizeRelations (data, fields) {
  return {
    ...data,
    ...fields.reduce(
      (prev, field) => ({
        ...prev,
        [field]: Array.isArray(data[field])
          ? data[field].map(x => x.id)
          : data[field].id
      }),
      {}
    )
  }
}

export function makeNormalizeRelations ({ fields, store }) {
  return data => ({
    ...data,
    ...fields.reduce((prev, field) => {
      const fieldRef = Array.isArray(data[field])
        ? data[field].map(x => x.id)
        : data[field].id

      Array.isArray(data[field])
        ? data[field].forEach(x => store.commit(`${field}/add`, x))
        : store.commit(`${field}/add`, data[field])

      return {
        ...prev,
        [field]: fieldRef
      }
    }, {})
  })
}

export function resolveRelations (data, fields, rootGetters) {
  return {
    ...data,
    ...fields.reduce(
      (prev, field) => ({
        ...prev,
        [field]: Array.isArray(data[field])
          ? data[field].map(x => rootGetters[`${field}/find`](x))
          : rootGetters[`${field}/find`](data[field])
      }),
      {}
    )
  }
}

export function makeResolveRelations ({ fields, store }) {
  return data => ({
    ...data,
    ...fields.reduce(
      (prev, field) => ({
        ...prev,
        [field]: Array.isArray(data[field])
          ? data[field].map(x => store.getters[`${field}/find`](x))
          : store.getters[`${field}/find`](data[field])
      }),
      {}
    )
  })
}
