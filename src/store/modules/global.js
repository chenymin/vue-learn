const state = {
  toast: {
    title: '',
    content: ''
  },
  fullPath: '',
  currentRouterInfo: {
    title: '',
    alone: ''
  },
  platform: {
    text: '四联化工'
  }
}

const getters = {
  toast: state => state.toast,
  fullPath: state => state.fullPath,
  currentRouterInfo: state => state.currentRouterInfo,
  platform: state => state.platform
}

const actions = {
}

const mutations = {
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
