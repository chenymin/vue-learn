import _ from 'lodash'
import {setStore, removeStore} from '../../utils/storage'
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
  fullPath: '',
  currentRouterInfo: {
    title: '',
    alone: ''
  }
}

const getters = {
  toast: state => state.toast,
  validatorMsg: state => state.validatorMsg,
  applyEdit: state => state.applyEdit,
  localApplyEdit: state => state.localApplyEdit,
  fullPath: state => state.fullPath,
  currentRouterInfo: state => state.currentRouterInfo
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
  changeFullPath (state, item) {
    state.fullPath = item
  },
  changeRouterInfo (state, {title, along}) {
    state.currentRouterInfo = Object.assign({}, {title, along})
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
