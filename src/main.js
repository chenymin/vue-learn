// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/utils/_polyfill'
import * as filters from '@/utils/filters'
import eventBus from '@/utils/eventBus'
import VeeValidate, {Validator} from 'vee-validate'
import dictionary from '@/utils/validatorConfig'
import zh from 'vee-validate/dist/locale/zh_CN'
import serviceContainer from '@/utils/service-container'

// 有赞vant组件
import { DatetimePicker } from 'vant'
Vue.use(DatetimePicker)

// PortalVue
import 'wicg-inert'
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

// 动态配置
import dynamicConfig from './dynamic-config'
import makeCrudModule from './store/modules/crud'
import makeCrudRoutes from './router/crud'
import makeService from './api/service'
import FormContainer from '@/views/dynamicVueCrud/FormContainer'
import ListingContainer from '@/views/dynamicVueCrud/ListingContainer'

dynamicConfig.contentTypes.forEach(contentType => {
  // Register dynamically generated store modules.
  store.registerModule(
    contentType.name,
    makeCrudModule({
      service: makeService(contentType.endpoint)
    })
  )

  // Register dynamically generated routes.
  router.addRoutes(
    makeCrudRoutes({
      components: {
        FormContainer,
        ListingContainer
      },
      contentType
    })
  )
})

// 修改默认错误提示
const config = {
  locale: zh,
  inject: true
}

Validator.localize(dictionary)
Validator.localize('zh_CN')
Vue.use(VeeValidate, config)

Vue.config.productionTip = false

if (!Vue.prototype.eventBus) {
  Vue.prototype.eventBus = eventBus
}

// 添加全局过滤器
Object.keys(filters).forEach(function (key, index, arr) {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: serviceContainer,
  router,
  store,
  render: h => h(App)
})
