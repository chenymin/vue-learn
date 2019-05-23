import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getStore} from '../utils/storage'
import {setTitle} from '../utils/util'
import routerList from 'routerConfigInfo/routerInfo'

Vue.use(Router)

const router = new Router({
  routes: routerList || []
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

export default router
