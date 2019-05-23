import * as types from '../mutation-types'
import userSerice from '@/api/user.js'
import {setStore, getStore} from '@/utils/storage'

const state = {
  loginOrRegObj: {},  // 判断是登录还是注册
  entLoginObj: {},  // 企业用户登陆
  entLogoutObj: {}, // 企业用户退出登陆
  entRegisterObj: {},  // 企业用户注册
  queryIsExistApplyObj: {}  // 是否存在额度申请
}

const getters = {
  loginOrRegObj: state => state.loginOrRegObj,
  entLoginObj: state => state.entLoginObj,
  entLogoutObj: state => state.entLogoutObj,
  entRegisterObj: state => state.entRegisterObj,
  queryIsExistApplyObj: state => state.queryIsExistApplyObj
}

const actions = {
  /**
   * 判断是登录还是注册
   */
  async LoginOrRegister ({commit}, params) {
    const {data, respCode} = await userSerice.loginOrRegister(params)
    commit(types.LOGIN_OR_REGISTER, {data, params})
    return {data, respCode}
  },
  /**
   * 企业用户登陆
   */
  async EntLogin ({commit}, params) {
    const {data, respCode} = await userSerice.entLogin(params)
    commit(types.ENT_LOGIN, {data, respCode})
    return {data, respCode}
  },
  /**
   * 企业用户注册
   */
  async EntRegister ({commit}, params) {
    const {data, respCode} = await userSerice.entRegister(params)
    data && commit(types.ENT_REGISTER, {data})
    return {data, respCode}
  },
  /**
   * 查询客户是否存在额度申请
   */
  async QueryIsExistApply ({commit}, params) {
    const {data, respCode} = await userSerice.queryIsExistApply(params)
    commit(types.QUERY_IS_EXIST_APPLY, {data})
    return {data, respCode}
  },
  /**
   * 企业用户找回密码
   */
  async EntResetP ({commit}, params) {
    const {data, respCode} = await userSerice.entResetP(params)
    commit(types.ENT_RESET_PWD, {data})
    return {data, respCode}
  },
  /**
   * 获取全量银行信息列表
   */
  async QueryAllBanksInfo () {
    const {data, respCode} = await userSerice.queryAllBanksInfo()
    return {data, respCode}
  },
  /**
   * 获取全量银行信息列表
   */
  async SendResetPSms () {
    const {data, respCode} = await userSerice.sendResetPSms()
    return {data, respCode}
  },
  /**
   * 修改密码
   */
  async modifyP ({commit}, params) {
    const {data, respCode} = await userSerice.modifyP(params)
    return {data, respCode}
  },
  /**
   * 企业用户退出登陆
   */
  async entLogout () {
    const {data, respCode} = await userSerice.entLogout()
    return {data, respCode}
  },
  /**
   * 获取渠道中文名称
   */
  async queryChannelName ({commit}, params) {
    const {data, respCode} = await userSerice.queryChannelName(params)
    return {data, respCode}
  }
}

const mutations = {
  getEnterAndSocial () {  // 获取社会信用代码、企业名称(刷新导致vuex里没有数据，就从localstorage里拿)
    let obj = JSON.parse(getStore('loginOrRegObj'))
    Object.assign(state.loginOrRegObj, obj)
  },
  getApplyIsExistInfo () {  // 获取查询客户是否存在额度申请(刷新导致vuex里没有数据，就从localstorage里拿)
    let obj = JSON.parse(getStore('queryIsExistApplyObj'))
    Object.assign(state.queryIsExistApplyObj, obj)
  },
  // setSetLoginOrRegObj ({params}) {
  //   Object.assign(state.loginOrRegObj, params)
  // },
  /**
   * 判断是登录还是注册
   */
  [types.LOGIN_OR_REGISTER] (state, {data, params}) {
    Object.assign(state.loginOrRegObj, data, params)
    setStore('loginOrRegObj', JSON.stringify(state.loginOrRegObj))
  },
  /**
   * 企业用户登陆
   */
  [types.ENT_LOGIN] (state, {data, respCode}) {
    Object.assign(state.entLoginObj, {data, respCode})
  },
  /**
   * 查询客户是否存在额度申请
   */
  [types.QUERY_IS_EXIST_APPLY] (state, {data}) {
    Object.assign(state.queryIsExistApplyObj, data)
    setStore('queryIsExistApplyObj', JSON.stringify(state.queryIsExistApplyObj))
  },
  /**
   * 企业用户找回密码
   */
  [types.ENT_RESET_PWD] (state, {data}) {
    Object.assign(state.entLoginObj, data)
  },
  /**
   * 企业用户退出登陆
   */
  [types.ENT_LOGOUT] (state, {data}) {
    Object.assign(state.entLogoutObj, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
