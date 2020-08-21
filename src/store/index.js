import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    addtype: '',
    addlist: []
  },
  mutations: {
    addTask(state, { type, list }) {
      state.addtype = type
      state.addlist = list
    },
  },
  actions: {
  },
  modules: {
  }
})
