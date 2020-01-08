const BASE_URL = 'https://jsonplaceholder.typicode.com'

function mapSchema ({ entity, schema }) {
  const result = {}

  Object.keys(schema).forEach(key => {
    const config = schema[key]
    const resolver = config.resolver || config
    const value = entity[config.field] || entity[key]

    Object.defineProperty(result, key, {
      // This getter function is only triggered
      // when the value is accessed.
      get () {
        return resolver(value, entity)
      }
    })
  }, {})

  return result
}

export default function makeService ({ schema, type }) {
  return {
    find (id) {
      return fetch(`${BASE_URL}/${type}/${id}`)
        .then(x => x.json())
        .then(entity => mapSchema({ entity, schema }))
    },
    referencedBy ({ id, type: refType }) {
      return fetch(`${BASE_URL}/${refType}/${id}/${type}`)
        .then(x => x.json())
        .then(entities =>
          entities.slice(0, 12).map(entity => mapSchema({ entity, schema }))
        )
    }
  }
}
