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
      elements
    };
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
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(id) {
      console.log("node clicked", id);
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
