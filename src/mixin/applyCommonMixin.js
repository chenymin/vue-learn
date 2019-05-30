import _ from 'lodash'
import Vue from 'vue'
import FormGenerator from '@/components/base/FormGenerator'

if (!Vue.options.components.FormGenerator) {
  Vue.component(
    'FormGenerator',
    FormGenerator
  )
}

export default {
  inject: ['applyRouter'],
  data () {
    return {
      name: 'FormGenerator'
    }
  },
  methods: {
    /**
     * 修改组件的属性禁止输入、点击、隐藏组件
     * */
    modifySchemeItem (pageScheme, needModifyScheme) {
      needModifyScheme.forEach((item) => {
        const index = _.findIndex(pageScheme, (o) => o.model === item.model)
        index >= 0 && Object.assign(pageScheme[index], item)
      })
    },
    /**
     * 分割省市区 '100000-100010-100012'---> [100000, 100010, 100012]
     * @param newVal {String}
     * @return []
     * */
    splitProvincialDetail (newVal) {
      if (newVal) {
        const [province, city, area] = this.formData.provincialDetail.split('-')
        Object.assign(this.formData, {[this.changeKey.province]: province, [this.changeKey.city]: city, [this.changeKey.area]: area})
      }
    },
    /**
     * 找到所需的schema item
     * @param arrayItem {Array} 过滤函数
     * @return []
     * */
    findSchemaItems (arrayItem) {
      return this.schema.filter(({model}) => {
        return arrayItem.includes(model)
      })
    },
    /**
     * 显示toast
     * @param msg toast显示的信息
     * @return null
     * */
    showToast (msg) {
      this.$store.commit('changeToast', {content: msg})
      this.eventBus.$emit('toast/show')
    },
    /**
     * 获取apply初始化的数据
     * @param dispathName {String}  分发路径名称
     * @param param {Object} 参数
     * @param fn {Function} 回调函数
     * @return null
     * */
    getInitData (dispathName, fn, param) {
      this.$store.dispatch(dispathName, {param}).then(({respCode, data}) => {
        if (respCode === '000000') {
          fn.apply(this, data)
        }
      })
    },
    /**
     * 表单信息检验提交
     * @param refs {String} 表单对应的ref
     * @param call {Function} 提交的回调函数
     * @return void
     * */
    formValid (refs, call) {
      this.$refs[refs].validator().then(({isValid}) => {
        call && call()
      }).catch(({errorMsg}) => {
        this.showToast(errorMsg[0].msg)
      })
    },
    showAlert (msg) {
      this.applyRouter.isAlertShow = true
      this.applyRouter.alertMsg = msg
    }
  },
  mounted () {
    if (this.applyRouter) {
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
