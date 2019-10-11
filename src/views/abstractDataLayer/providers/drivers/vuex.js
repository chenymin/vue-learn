export default function makeVuexDriver ({ namespace, store }) {
  return {
    computed: {
      items () {
        return store.state[namespace].items
      }
    },
    methods: {
      list () {
        store.dispatch(`load`)
      }
    }
  }
}
