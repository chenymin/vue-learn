import HttpClient from '@/utils/service/httpClient'
import eventBus from '@/utils/eventBus'
import store from '@/store/index'
import _ from 'lodash'

const showToast = (msg) => {
  store.commit('changeToast', {content: msg})
  eventBus.$emit('toast/show')
}

export const personHttpClient = new HttpClient()

export const enterpriseHttpClient = new HttpClient({
  headers: {
    'Content-Type': 'application/json',
    post: {
      'Content-Type': 'application/json'
    }
  },
  requstInterceptors: function (config) {
    eventBus.$emit('loding/show')
    config.headers['Content-Type'] = config['Content-Type']
    document.cookie = `_csrf=${new Date().getTime()}; path=/`
    return config
  },
  responseSucess: function (data) {
    const {respCode, respMsg} = data
    eventBus.$emit('loding/hidden')
    if (respCode && respCode !== '000000') {
      if (respCode && (respCode !== '999996' && respCode !== '999999')) {
        showToast(respMsg)
      }
    }
    return {data: data.data, respCode, respMsg}
  },
  responseFail: function (data) {
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
    return data
  }
})
