import {getStore} from '../../utils/storage'

export default function isLogin ({ to, next, store, nextPipe }) {
  const {path} = to
  const token = getStore('tokenId')
  store.commit('changeFullPath', to.fullPath)
  if (token) {
    nextPipe ? nextPipe() : next()
  } else if (path !== 'login') {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      }
    })
  }
}
