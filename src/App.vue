<template>
  <div id="app">
    <cytoscape
      ref="cyRef"
      :config="config"
      v-on:mousedown="addNode"
      v-on:cxttapstart="updateNode"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:mousedown="deleteNode($event, def.data.id)"
      />
    </cytoscape>
  </div>
</template>

<script>
import config from "./config";

const elements = [...config.elements];
delete config.elements;

export default {
  data() {
    return {
      config,
      elements,
      tid
    };
  },
  mounted(){
    this.tid = Math.random()
  },
  methods: {
    storeToCy(tid){
      let nodes = this.$store.getters.getTreeNodes(tid);
      let edges = this.$store.getters.getTreeEdges(tid);
      let config = {}
      config.elements = []
      for (let node of nodes){
        let el = {}
        el.data = {id : node.id}
        el.group = "nodes"
      }

      for (let edge of edges){
        let el = {}
        el.data = {
          id     : edge.id,
          source : edge.from.id,
          target : edge.to.id
        }
        el.group = "edges"
      }      

      config.layout = {
        name : 'grid'
      }


    },
    addNode(event) {
      node = {
        id     : hash(new Date()),
        name   : "",
        dob    : "",
        dod    : "",
        pob    : "",
        gender : "",
        nat    : "",
        misc   : []
      }
      this.$store.mutations.addNode(state, this.tid, node)
    },
    addEdge(event) {
      edge = {
        to   : {
          id : hash(new Date()),
          dob: "",
          name: "",
          dod: "",
          pob: "",
          nat: "",
          misc: []
        },

        from : {
          id : hash(new Date()),
          dob: "",
          name: "",
          dod: "",
          pob: "",
          nat: "",
          misc: []
        },
        label : "emptyRelationship"
      }
    },
    deleteEdge(id){
      delete this.$store.getters.getTreeEdges(state, this.tid)[id]
    },
    deleteNode(id) {
      delete this.$store.getters.getNodes(state, this.tid)[id]
    },
    updateNode(event) {
      console.log("right click node", event);
    },
    preConfig(cytoscape) {
      console.log("calling pre-config", cytoscape);
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);
    }
  }
};
</script>
