import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import global from './modules/global'
import carLoanApply from './modules/carLoanApply'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    global,
    carLoanApply,
    user
  },
  strict: debug
})
