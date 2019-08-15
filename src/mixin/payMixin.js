export default {
  inject: ['payRouter'],
  methods: {
  },
  components: {
  },
  mounted () {
    this.payRouter.myHeaderInfo.url = ''
    this.payRouter.myHeaderInfo.isArrow = false
    this.payRouter.myHeaderInfo.isByClickReturn = false
  }
}
