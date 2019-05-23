import {getStore} from '@/utils/storage'
import {decrypt} from '@/utils/encryption/aesEncryptUtil'
import FormGenerator from '@/components/base/FormGenerator'

export default {
  inject: ['payRouter'],
  methods: {
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
     * 获取页面的配置信息
     * @param key 配置页面的key值
     * @return Object
     * */
    getApplyPageInfo (key) {
      return JSON.parse(decrypt(getStore('pageInfo')))[key]
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
     * @param call {Function} 回调函数
     * @return null
     * */
    getInitData (dispathName, call, param) {
      this.$store.dispatch(dispathName, {param}).then(({respCode, data}) => {
        if (respCode === '000000') {
          call(data)
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
    }
  },
  components: {
    FormGenerator
  },
  mounted () {
    this.payRouter.myHeaderInfo.url = ''
  }
}
