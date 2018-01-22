import _ from 'lodash'
import {getStore, setStore, removeStore} from '../../utils/storage'
import {isWeixin} from '../../utils/util'

const state = {
  toast: {
    title: '',
    content: ''
  },
  applyEdit: {
  },
  localApplyEdit: {},
  validatorMsg: {},
  channelNo: '',
  sellerId: '',
  openId: '',
  projectNo: '',
  loanAppNo: '',
  fullPath: ''
}

const getters = {
  toast: state => state.toast,
  validatorMsg: state => state.validatorMsg,
  applyEdit: state => state.applyEdit,
  channelNo: state => state.channelNo,
  sellerId: state => state.sellerId,
  openId: state => state.openId,
  projectNo: state => state.projectNo,
  loanAppNo: state => state.loanAppNo,
  localApplyEdit: state => state.localApplyEdit,
  fullPath: state => state.fullPath
}

const actions = {
  closeApp () {
    removeStore('jumpToComplete')
    removeStore('applyEdit')
    removeStore('token')
    /* eslint-disable */
    isWeixin() && WeixinJSBridge.call('closeWindow')
    window.opener = null
    window.close()
  }
}

const mutations = {
  getValidatorMsg (state, item) {
    _.assign(state.validatorMsg, item)
  },

  cleanValidatorMsg () {
    state.validatorMsg = {}
  },

  changeApplyEdit (state, item) {
    _.assign(state.applyEdit, item)
    _.assign(state.localApplyEdit, item)
    setStore('applyEdit', state.localApplyEdit)
  },

  cleanApplyEdit () {
    state.applyEdit = {}
  },
  getChannelInfo () {
    state.channelNo = getStore('channelNo')
    state.sellerId = getStore('sellId')
    state.openId = getStore('openId')
    state.projectNo = getStore('projectNo')
    state.loanAppNo = getStore('loanAppNo')
  },
  changeFullPath (state, item) {
    state.fullPath = item
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
