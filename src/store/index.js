import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trees: {
      id: Number,
      nodes: {
        id : {
          id: Number,
          name: String,
          dob: String,
          dod: String,
          pob: String,
          gender: String,
          nat: String,
          misc: []
        }
      },
      edges: {
       id: {
          to: {
            id: Number,
            name: String,
            dob: String,
            dod: String,
            pob: String,
            gender: String,
            nat: String,
            misc: []
          },
          from: {
            id: Number,
            name: String,
            dob: String,
            dod: String,
            pob: String,
            gender: String,
            nat: String,
            misc: []
          },
          label: String,
        }
      } 
    }
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
      state.trees[tid].nodes[node.id] = node
    },
    addEdge(state, tid, edge) {
      state.trees[tid].edges.push(edge)
    },
  },
})
