export default {
  inject: ['applyRouter'],
  mounted () {
    if (this.applyRouter) {
      this.applyRouter.myHeaderInfo.isByClickReturn = false
      this.applyRouter.myHeaderInfo.isArrow = true
      this.applyRouter.isShowHeader = true
      this.applyRouter.myHeaderInfo.url = ''
      this.applyRouter.currentIndex = this.pageCurrentIndex
      this.applyRouter.isShowPageNav = true
    }
    this.eventBus.$on('alert-show', this.showAlert)
  },
  destroyed () {
    this.eventBus.$off('alert-show')
  }
}
