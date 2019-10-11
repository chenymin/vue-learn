import productService from '@/views/abstractDataLayer/services/product'

const state = {
  items: []
}

const getters = {
  loanInfo: state => state.loanInfo
}

const actions = {
  load: async ({ commit }) => {
    commit('add', await productService.list())
  }
}

const mutations = {
  add: (state, products) => {
    state.items = products
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
