import * as types from '../mutation-types'
import ApplyService from '@/api/loanApply'
import {setStore, getStore} from '../../utils/storage'
const state = {
  applyStatus: '',
  applyInfo: {},
  applyToken: '',
  enterpriseInfo: {},
  legalPersonInfo: {},
  completeLimitInfo: {},
  queryImageInfoList: {}
}

const getters = {
  applyStatus: state => state.applyStatus,
  applyToken: state => state.applyToken,
  enterpriseInfo: state => state.enterpriseInfo,
  legalPersonInfo: state => state.legalPersonInfo,
  completeLimitInfo: state => state.completeLimitInfo,
  queryImageInfoList: state => state.queryImageInfoList
}

const mutations = {
  [types.APPLY_QUERYINFO] (state, {data}) {
    state.applyStatus = data.applyInfo.applyStatus
  },
  [types.APPLY_TOKEN] (state, {data}) {
    state.applyToken = data.applyToken
    setStore('applyToken', data.applyToken)
  },
  [types.APPLY_LIMITINFO] (state, {data}) {
    state.enterpriseInfo = data && data.enterpriseInfo
  },
  [types.APPLY_LEGALPERSONINFO] (state, {data}) {
    state.legalPersonInfo = data && data.legalPersonInfo
  },
  [types.QUERY_IMAGE_INFO_LIST] (state, {data}) {
    state.queryImageInfoList = data
  }
}

const actions = {
  // 用户额度申请状态查询跳转页面
  async applyStatuQuery ({commit}, params) {
    const {data, respCode} = await ApplyService.queryApplyStatus()
    return {data, respCode}
  },
  // 用户额度信息查询
  async applyInfoQuery ({commit}, params) {
    const {data, respCode} = await ApplyService.queryApplyInfo()
    data && commit(types.APPLY_QUERYINFO, {data})
    return {data, respCode}
  },
  // 获取applyToken
  async changeApplyToken ({commit}, params) {
    const {data, respCode} = await ApplyService.applyNow()
    data && commit(types.APPLY_TOKEN, {data})
    return {data, respCode}
  },
  // 获取企业信息
  async getLimitApplyInfo ({commit}, params) {
    const {data, respCode} = await ApplyService.enterpriseInfoGet({applyToken: getStore('applyToken')})
    data && commit(types.APPLY_LIMITINFO, {data})
    return {data, respCode}
  },
  // 保存企业信息
  async saveLimitApplyInfo ({commit}, params) {
    const {data, respCode} = await ApplyService.enterpriseInfoSave(Object.assign({applyToken: getStore('applyToken')}, params))
    return {data, respCode}
  },
  // 获取企业法人信息
  async getLegalPersonInfo ({commit}, params) {
    const {data, respCode} = await ApplyService.legalPersonInfoGet({applyToken: getStore('applyToken')})
    data && commit(types.APPLY_LEGALPERSONINFO, {data})
    return {data, respCode}
  },
  // 发送验证码
  msgVerificationSend ({commit}, params) {
    ApplyService.sendMsgVerification(Object.assign({applyToken: getStore('applyToken')}, params))
  },
  // 保存企业法人信息
  async saveLegalPersonInfo ({commit}, params) {
    const {data, respCode} = await ApplyService.legalPersonInfoSave(Object.assign({applyToken: getStore('applyToken')}, params))
    return {data, respCode}
  },
  // 获取影像信息
  async queryImageInfoList ({commit}, params) {
    const {data, respCode} = await ApplyService.queryImageInfoList(Object.assign({applyToken: getStore('applyToken')}, params))
    data && commit(types.QUERY_IMAGE_INFO_LIST, {data})
    return {data, respCode}
  },
  // 提交额度申请
  async submitLimitApply ({commit}, params) {
    const {data, respCode} = await ApplyService.submitLimitApply(Object.assign({applyToken: getStore('applyToken')}, params))
    return {data, respCode}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
