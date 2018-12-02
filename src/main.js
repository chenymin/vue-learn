// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './utils/filters'
import eventBus from './utils/eventBus'
import './utils/_polyfill'
import VeeValidate, {Validator} from 'vee-validate'
import dictionary from './utils/validatorConfig'
import zh from 'vee-validate/dist/locale/zh_CN'

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
  router,
  store,
  render: h => h(App)
})
