export default function makeServiceDriver ({ service }) {
  return {
    data () {
      return {
        response: []
      }
    },
    computed: {
      items () {
        return this.response
      }
    },
    methods: {
      async list () {
        this.response = await service.list()
      }
    }
  }
}
