import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getStore} from '../utils/storage'
import {setTitle} from '../utils/util'

Vue.use(Router)
const PushDemo = r => require.ensure([], () => r(require('@/views/push-demo')), 'chunk-pushdemo')
const demo = r => require.ensure([], () => r(require('@/views/demo')), 'chunk-demo')
const SliderCard = r => require.ensure([], () => r(require('@/views/slider-card')), 'chunk-sliderCard')
const TransitionExpand = r => require.ensure([], () => r(require('@/views/transitionexpand-demo')), 'chunk-transitionexpand')
const ScrollList = r => require.ensure([], () => r(require('@/views/scroll-list')), 'chunk-scrollList')
const NavButton = r => require.ensure([], () => r(require('@/views/nav-button')), 'chunk-navButton')
const OverLay = r => require.ensure([], () => r(require('@/views/over-lay')), 'chunk-overlay')
const StateManager = r => require.ensure([], () => r(require('@/views/state-manager')), 'chunk-stateManager')
const ApplyAdjustPrice = r => require.ensure([], () => r(require('@/views/adjust/applyAdjustPrice')), 'chunk-applyAdjustPrice')

const router = new Router({
  routes: [
    {name: 'pushdemo', path: '/pushdemo', component: PushDemo, meta: {auth: false, title: '下拉刷新'}},
    {name: 'statemanager', path: '/statemanager', component: StateManager, meta: {auth: false, title: '状态管理'}},
    {name: 'demo', path: '/demo', component: demo, meta: {auth: false, title: 'demo', transitionName: `slide`}},
    {name: 'slidercard', path: '/slidercard', component: SliderCard, meta: {auth: false, title: 'slidercard'}},
    {name: 'transitionexpand', path: '/transitionexpand', component: TransitionExpand, meta: {auth: false, title: 'transitionexpand'}},
    {name: 'scrolllist', path: '/scrolllist', component: ScrollList, meta: {auth: false, title: 'scrolllist'}},
    {name: 'navbutton', path: '/navbutton', component: NavButton, meta: {auth: false, title: 'navButton', transitionName: `slide`}},
    {name: 'overlay', path: '/overlay', component: OverLay, meta: {auth: false, title: 'overlay', transitionName: `zoom`}},
    {name: 'apply', path: '/apply', component: ApplyAdjustPrice, meta: {auth: false, title: '商品', transitionName: `zoom`}}
  ]
})

router.beforeEach((to, from, next) => {
  const {path} = to
  const {title, along} = to.meta
  setTitle(to.meta.title)
  store.commit('changeRouterInfo', {title, along})
  if (to.meta.auth) {
    const token = getStore('token')
    store.commit('changeFullPath', to.fullPath)
    if (token) {
      next()
    } else if (path !== 'login') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
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
