<template>
  <div id="app">
    <cytoscape
      ref="cyRef"
      :config="config"
      v-on:click.native="addNode"
    >
    <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:mouseup="deleteNode($event, def.data.id)"
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
      count: 0,
      tid: 0,
      delMode: false,
      creMode: false,
    };
  },
  mounted(){
    this.tid = this.$store.getters.getActiveTree
    this.$store.commit("addTree", { id: this.tid, nodes: [], edges: [] })
    window.addEventListener("keypress", function(e) {
       if(String.fromCharCode(e.keyCode) == 'd' || String.fromCharCode(e.keyCode) == 'D') {
         this.setDelMode();
       } else if (String.fromCharCode(e.keyCode) == 'c' || String.fromCharCode(e.keyCode) == 'C') {
         this.setCreMode();  
       }
       else if (String.fromCharCode(e.keyCode) == 'm' || String.fromCharCode(e.keyCode) == 'M') {
         this.setMvMode();  
       }
    }.bind(this));
  },
  methods: {
    setCreMode() {
      if (!this.creMode) {
            this.creMode = true;
            this.delMode = false;
         }
         else {
          this.creMode = false;
         }
    },
    setDelMode() {
      if (!this.delMode) {
        this.delMode = true;
        this.creMode = false;
      }
      else {
        this.delMode = false;
      }
    },
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
      if (!this.delMode && this.creMode) {
        let newNode = {
          id     : new Date().toString(),
          name   : "",
          dob    : "",
          dod    : "",
          pob    : "",
          gender : "",
          nat    : "",
          misc   : []
        }
        this.$store.commit("addNode", this.tid, newNode)
        console.log(event.target, this.$refs.cyRef.instance);
        if (event.target === this.$refs.cyRef.instance)
          console.log("adding node", event.target);
          let node = { group: "nodes", data: {id: ++this.count}, renderedPosition: {x: event.x, y: event.y}}
          console.log(event)
          this.elements.push(node)
      }
    },
    addEdge(event) {
      let edge = {
        to   : {
          id : new Date().toString(),
          dob: "",
          name: "",
          dod: "",
          pob: "",
          nat: "",
          misc: []
        },

        from : {
          id : new Date().toString(),
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
      delete this.$store.getters.getTreeEdges( this.tid)[id]
    },
    deleteNode(event, id) {
      // delete this.$store.getters.getTreeNodes( this.tid)[id]
      if(this.delMode == true) {
        this.$store.commit("removeNode", id)
        console.log("removing node clicked", id);
        console.log(event)
        let node = this.$refs.cyRef.instance.$(`#${id}`)
        console.log(node);
        event.cy.remove(node)
        
      }
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
