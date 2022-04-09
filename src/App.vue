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
    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(event, id) {
      console.log("node clicked", id);
      var node = this.$refs.cyRef.instance.$(`#${id}`)
      event.cy.remove(node)
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
