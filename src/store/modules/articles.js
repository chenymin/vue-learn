import Vue from 'vue'

import { normalizeRelations, resolveRelations } from '../helps'
import articleService from '@/api/articles'

const state = {
  byId: {},
  allIds: []
}

const getters = {
  // Return a single article with the given id.
  find: (state, _, __, rootGetters) => id => {
    // Swap ID referenes with the resolved author objects.
    return resolveRelations(state.byId[id], ['author'], rootGetters)
  },
  // Return a list of articles in the order of `allIds`.
  list: (state, getters) => {
    return state.allIds.map(id => getters.find(id))
  }
}

const actions = {
  load: async ({ commit }) => {
    const articles = await articleService.list()
    articles.forEach(item => {
      // Noramlize nested data and swap the author object
      // in the API response with an ID reference.
      commit('add', normalizeRelations(item, ['author']))
      // Add or update the author.
      commit('author/add', item.author, {
        root: true
      })
    })
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
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
