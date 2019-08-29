import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {setTitle} from '../utils/util'
import routerList from 'routerConfigInfo/routerInfo'
import middlewarePipeline from './middlewarePipeline'

Vue.use(Router)

const router = new Router({
  routes: routerList || []
})

router.beforeEach((to, from, next) => {
  const {title, along} = to.meta
  setTitle(to.meta.title)
  store.commit('changeRouterInfo', {title, along})

  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = { to, from, next, store }
  return middleware[0]({
    ...context,
    nextPipe: middlewarePipeline(context, middleware, 1)
  })
})

export default router
