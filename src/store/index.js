import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import global from './modules/global'
import loanApply from './modules/loanApply'
import article from './modules/articles'
import author from './modules/author'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    global,
    loanApply,
    article,
    author
  },
  strict: debug
})
