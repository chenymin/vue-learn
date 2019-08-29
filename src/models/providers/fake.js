const db = [
  {
    author: {
      firstName: 'Markus',
      lastName: 'Oberlehner'
    },
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    id: 1,
    title: 'Lorem ipsum dolor'
  },
  {
    author: {
      firstName: 'John',
      lastName: 'Doe'
    },
    body: 'Consetetur sadipscing elitr, sed diam nonumy lorem ipsum tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    id: 2,
    title: 'Consetetur sadipscing'
  }
]

const flatten = array => array.reduce((prev, x) => ({ ...prev, ...x }), {})

export default {
  async find (query) {
    const queryObject = flatten(query)
    // Here you would usually call an API
    // endpoint or something similar.
    return db.find(
      x => !Object.keys(queryObject).some(key => x[key] !== queryObject[key])
    )
  },
  async list (query = []) {
    const queryObject = flatten(query)
    // Here you would usually call an API
    // endpoint or something similar.
    return db.filter(
      x => !Object.keys(queryObject).some(key => x[key] !== queryObject[key])
    )
  }
}
