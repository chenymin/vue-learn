import axios from 'axios'
import { Base64 } from 'js-base64'
import {getStore} from './storage'
import store from '../store/index'
import eventBus from '../utils/eventBus'
import _ from 'lodash'

const dev = 'http://10.166.10.76:22201'
export const url = process.env.NODE_ENV === 'development' ? dev : ''

const showToast = (msg) => {
  store.commit('changeToast', {content: msg})
  eventBus.$emit('toast/show')
}

const instance = axios.create({
  baseURL: `${url}/transfer-mng`,
  timeout: 300000,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: '_csrf',
  transformRequest: [function (data, headers) {
    if (_.isEmpty(data)) return data
    return Base64.encode(JSON.stringify(data))
  }],
  validateStatus (status) {
    return status === 200
  }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  // before request send, set csrf
  eventBus.$emit('loding/show')
  if (!config.headers.tokenId) {
    config.headers.tokenId = getStore('token')
  }
  config.headers['Content-Type'] = 'text/plain'
  document.cookie = `_csrf=${new Date().getTime()}; path=/`
  return config
})

// 返回拦截器
instance.interceptors.response.use(
  ({data: {data, respCode, respMsg}}) => {
    eventBus.$emit('loding/hidden')
    if (respCode && respCode !== '000000') {
      if (respCode && (respCode !== '999996' && respCode !== '999999')) {
        showToast(respMsg)
      }
    }
    return {data, respCode, respMsg}
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
        showToast('系统出错')
      }
    }
    return Promise.reject(data)
  })

export default instance
