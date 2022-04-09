import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTree: 0,
    trees: [{
      id: Number,
      nodes: [
        {
          id: Number,
          name: String,
          dob: String,
          dod: String,
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
    },
    getActiveTree(state) {
      return state.activeTree
    }
  },
  mutations: {
    addTree(state, tree) {
      state.trees.push(tree)
    },
    addNode(state, node) {
      state.trees.filter((tree) => tree.id == state.activeTree)[0].nodes.push(node)
    },
    addEdge(state, edge) {
      state.trees.filter((tree) => tree.id == state.activeTree)[0].edges.push(edge)
    },
    removeTree(state) {
      delete state.activeTree
    },
    removeNode(state, nid) {
      delete state.activeTree.nodes.filter((n) => n.id != nid)
    },
    removeEdge(state, eid) {
      delete state.activeTree.edges.filter((e) => e.id != eid)
    }
  },
})
