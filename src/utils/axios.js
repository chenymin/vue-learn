import axios from 'axios'
import URLSearchParams from 'url-search-params'
import {getStore} from './storage'
import store from '../store/index'
import eventBus from '../utils/eventBus'
import _ from 'lodash'
import router from '../router/index'
import {getUrl} from '../utils/util'

export const url = process.env.NODE_ENV === 'development' ? 'http://10.166.2.66:8082' : getUrl() + '/credit-server-web'

const showToast = (msg) => {
  store.commit('changeToast', {content: msg})
  eventBus.$emit('toast/show')
}

const instance = axios.create({
  baseURL: url,
  timeout: 10000,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: '_csrf',
  transformRequest: [function (data, headers) {
    if (_.isEmpty(data)) return data
    // transform obj to formData
    var params = new URLSearchParams()
    Object.entries(data).forEach((item) => params.append.apply(params, item))
    return params
  }],
  validateStatus (status) {
    return status === 200
  }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  // before request send, set csrf
  eventBus.$emit('loding/show')
  if (!config.headers.authorization) {
    config.headers.authorization = getStore('token')
  }
  config.headers.proType = getStore('projectNo')
  document.cookie = `_csrf=${new Date().getTime()}; path=/`
  return config
})

// 返回拦截器
instance.interceptors.response.use(
  ({data: {code, message, data, statusCode}}) => {
    eventBus.$emit('loding/hidden')
    // console.log(code)
    if (code === 'fail') {
      if (!statusCode) {
        showToast(message)
      } else if (statusCode === '0000') {
        showToast(message)
      }
    }
    if (data) {
      return {data, code, statusCode}
    }
    return {
      code: '-1',
      data: ''
    }
  },
  (data) => {
    eventBus.$emit('loding/hidden')
    if (!data) {
      showToast('网络异常，请稍后再试')
    } else {
      const {response} = _.isObject(data) && data
      if (!response) {
        showToast('网络异常，请稍后再试')
      } else {
        const {status} = response
        if (status && status === 401) {
          // showToast('token失效，请重新登录')
          store.dispatch('removeToken')
          router.replace({
            path: '/login',
            query: {redirect: store.state.global.fullPath}
          })
        } else if (status && status === 403) {
          showToast(response.data.message)
        } else {
          showToast('系统出错')
        }
      }
    }
    return Promise.reject(data)
  })

export default instance
