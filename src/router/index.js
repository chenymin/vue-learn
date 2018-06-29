import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getStore} from '../utils/storage'
import {setTitle} from '../utils/util'

Vue.use(Router)
const PushDemo = r => require.ensure([], () => r(require('@/views/push-demo')), 'chunk-pushdemo')
const demo = r => require.ensure([], () => r(require('@/views/demo')), 'chunk-demo')
const SliderCard = r => require.ensure([], () => r(require('@/views/slider-card')), 'chunk-sliderCard')
const ScrollList = r => require.ensure([], () => r(require('@/views/scroll-list')), 'chunk-scrollList')

const router = new Router({
  routes: [
    { name: 'pushdemo', path: '/pushdemo', component: PushDemo, meta: { auth: false, title: '下拉刷新' } },
    { name: 'demo', path: '/demo', component: demo, meta: { auth: false, title: 'demo' } },
    { name: 'slidercard', path: '/slidercard', component: SliderCard, meta: { auth: false, title: 'slidercard' } },
    { name: 'scrolllist', path: '/scrolllist', component: ScrollList, meta: { auth: false, title: 'scrolllist' } }
  ]
})

const authenticationPath = ['applyfirst', 'applysecond', 'applythird']
function authenticationValid (name, next) {
  if (_.indexOf(authenticationPath, name) >= 0) {
    store.dispatch('getLoanInfo').then(({code, data}) => {
      if (code === 'suss') {
        if (data.signStatus === '1' && getStore('isValidOk') && getStore('isValidOk') === 'ok') {
          next()
        } else {
          next({
            name: 'basicvalid'
          })
        }
      }
    })
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  const {path, name} = to
  setTitle(to.meta.title)
  if (to.meta.auth) {
    const token = getStore('token')
    store.commit('changeFullPath', to.fullPath)
    if (token) {
      authenticationValid(name, next)
      // next()
    } else if (path !== 'login') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  clearInfo()
})

function clearInfo () {
  store.commit('cleanValidatorMsg')
  store.commit('cleanApplyEdit')
}
export default router
