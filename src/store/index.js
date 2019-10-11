import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import global from './modules/global'
import loanApply from './modules/loanApply'
import carLoanApply from './modules/carLoanApply'

import { makeNormalizeRelations, makeResolveRelations } from './helps'
import articleService from '@/api/articles'
import makeCrudModule from './modules/crud'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    global,
    carLoanApply,
    loanApply
  },
  strict: debug
})

store.registerModule(
  'article',
  makeCrudModule({
    normalizeRelations: makeNormalizeRelations({ fields: ['author'], store }),
    resolveRelations: makeResolveRelations({ fields: ['author'], store }),
    service: articleService
  })
)
store.registerModule('author', makeCrudModule())

export default store
