import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trees: [{
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
          id: Number,
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
    }]
  },
  getters: {
    getTrees(state){
      return state.trees;
    },
    getTree(state, tid){
      return state.trees[tid];
    },
    getTreeNodes(state, tid){
      return state.trees[tid].nodes;
    },
    getTreeNode(state, tid, nid){
      return state.trees[tid].nodes[nid];
    },
    getTreeEdges(state, tid){
      return state.trees[tid].edges;
    },
    getTreeEdge(state, tid, eid){
      return state.trees[tid].edges[eid]
    }
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
    removeTree(state, tid) {
      delete state.trees[tid]
    },
    removeNode(state, tid, nid) {
      delete state.trees[tid].nodes[nid]
    },
    removeEdge(state, tid, eid) {
      delete state.trees[tid].edges[eid]
    }
  },
  // actions: {
  // },
})
