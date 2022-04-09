import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trees: {
      id: Number,
      nodes: [
        {
          id: Number,
          name: String,
          dob: Date,
          dod: Date,
          pob: String,
          gender: String,
          nat: String,
          misc: []
        }
      ],
      edges: [
        {
          to: {
            id: Number,
            name: String,
            dob: Date,
            dod: Date,
            pob: String,
            gender: String,
            nat: String,
            misc: []
          },
          from: {
            id: Number,
            name: String,
            dob: Date,
            dod: Date,
            pob: String,
            gender: String,
            nat: String,
            misc: []
          },
          label: String,
        }
      ]
    }
  },
  getters: {

  },
  mutations: {
    addTree(state, tree) {
      state.trees.push(tree)
    },
    addNode(state, tid, node) {
      state.trees[tid].nodes.push(node)
    },
    addEdge(state, tid, edge) {
      state.trees[tid].edges.push(edge)
    },
  },
  // actions: {
  // },
})
