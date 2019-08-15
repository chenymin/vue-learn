/* eslint-disable */
import axios from 'axios'
import URLSearchParams from 'url-search-params'

const dev = '/api'
export const url = process.env.NODE_ENV === 'development' ? dev : ''

function isEmptyObject (obj) {
  return !obj || !Object.keys(obj).length
}

// 清理headers中不需要的属性
function clearUpHeaders (headers) {
  [
    'common',
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'options',
    'head'
  ].forEach(prop => headers[prop] && delete headers[prop])
  return headers
}

// 组合请求方法的headers
// headers = default <= common <= method <= extra
function resolveHeaders (method, defaults = {}, extras = {}) {
  method = method && method.toLowerCase()
  // check method参数的合法性
  if (!/^(get|post|put|delete|patch|options|head)$/.test(method)) {
    throw new Error(`method:${method}不是合法的请求方法`)
  }

  const headers = { ...defaults }
  const commonHeaders = headers.common || {}
  const headersForMethod = headers[method] || {}

  return clearUpHeaders({
    ...headers,
    ...commonHeaders,
    ...headersForMethod,
    ...extras
  })
}

// 组合请求方法的config
// config = default <=
/* eslint-disable */
function resolveConfig (method, defaults = {}, extras = {}) {
  if (isEmptyObject(defaults) && isEmptyObject(extras)) {
    return {}
  }
  const defaultsHeaders = defaults.headers
  const extrasHeaders =extras.headers
  return Object.assign({}, ...defaults, ...extras, resolveHeaders(method, defaultsHeaders, extrasHeaders))
}

class HttpClientModule {
  constructor (options = {}) {
    this.responseSucess = options.responseSucess
    this.responseFail = options.responseFail
    this.requstInterceptors = options.requstInterceptors
    const defaultHeaders = options.headers || {}
    if (options.headers) {
      delete options.headers
    }

    const defaultOptions = {
      baseURL: `${url}/transfer-mng`,
      timeout: 300000,
      xsrfCookieName: '_csrf',
      xsrfHeaderName: '_csrf',
      transformRequest: [function (data, headers) {
        if (isEmptyObject(data)) return data
        if (headers['Content-Type'] === 'application/json') {
          return JSON.stringify(data)
        } else {
          const params = new URLSearchParams()
          Object.entries(data).forEach((item) => params.append.apply(params, item))
          return params
        }
        return data
      }],
      validateStatus (status) {
        return status === 200
      }
    }

    this.defaultConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      	...defaultHeaders
      }
    }

    this.$http = axios.create({ ...defaultOptions, ...options })

    // requst 拦截
    this.$http.interceptors.request.use((config) => {
      // before request send, set csrf
      return this.requstInterceptors ? this.requstInterceptors(config) : config
    })
    // response 拦截
    this.$http.interceptors.response.use(
      ({data}) => {
        return this.responseSucess && this.responseSucess(data) || data
      },
      (data) => {
        this.responseFail && this.responseFail(data)
        return Promise.reject(data)
      })
  }

  get (url, data, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.get(url, data, resolveConfig(
        'get', this.defaultConfig, config)))
    })
  }

  post (url, data = undefined, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.post(url, data, resolveConfig(
        'post', this.defaultConfig, config)))
    })
  }

  put (url, data = undefined, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.put(url, data, resolveConfig(
        'put', this.defaultConfig, config)))
    })
  }

  delete (url, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.delete(url, resolveConfig(
        'delete', this.defaultConfig, config)))
    })
  }
}

// 导出工厂方法
export function createHttpClient (options, defaults) {
  return new HttpClientModule(options, defaults)
}

// 默认导出模块对象
export default HttpClientModule  // import

