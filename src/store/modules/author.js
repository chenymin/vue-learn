import Vue from 'vue'

const state = {
  byId: {},
  allIds: []
}

const getters = {
  find: state => id => state.byId[id],
  list: (state, getters) => {
    return state.allIds.map(id => getters.find(id))
  }
}

const mutations = {
  add: (state, item) => {
    Vue.set(state.byId, item.id, item)
    if (state.allIds.includes(item.id)) return
    state.allIds.push(item.id)
  }
}

export default {
  getters,
  mutations,
  namespaced: true,
  state
}
