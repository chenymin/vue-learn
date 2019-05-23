import {mapGetters} from 'vuex'

export default {
  inject: ['homeRouter'],
  data () {
    return {
      // home页需要插槽的header页面
      homeRouterItemAlong: ['noApply', 'homeCenter', 'my', 'status'],
      // 黄色渐变背景的header页面
      yellowHeader: ['noApply', 'my'],
      // middle白色字体
      whiteColorList: ['noApply', 'my']
    }
  },
  computed: {
    ...mapGetters([
      'currentRouterInfo',
      'platform'
    ])
  },
  methods: {
    changeHomeHeadInfo () {
      let rightText = ''
      const {text} = this.platform
      let {along, title} = this.currentRouterInfo
      if (this.homeRouterItemAlong.indexOf(along) === 0) {
        rightText = text
        title = ''
      }
      if (this.homeRouterItemAlong.indexOf(along) === 1 || this.homeRouterItemAlong.indexOf(along) === 3) {
        rightText = text
      }
      const isSlot = this.homeRouterItemAlong.indexOf(along) > -1
      const classNameBg = this.yellowHeader.indexOf(along) > -1 ? 'header-component__yellow-bg' : ''
      const classNameTextColor = this.whiteColorList.includes(along) ? 'header-component__white-text' : ''
      Object.assign(this.homeRouter.myHeaderInfo, {title, isSlot, classNameBg, rightText, classNameTextColor})
    }
  },
  mounted () {
    this.changeHomeHeadInfo()
  },
  destroyed () {
    // window.history.forward(1)
  }
}
