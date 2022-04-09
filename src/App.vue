<template>
  <div id="app" style="background-color: #8c1eff">
    <p style = "position: Absolute; top: 0px; right: 10px; border: #ff901f dashed 5px; padding: 12.5px; color: #ffd319"> 
      <br>
     Welcome to VueVoyer database visualizer! <br>
     Dynamically map relationships! <br>
     <br>
     <u><strong>Hotkeys:</strong></u> <br>
     Create Mode: C <br>
     Delete Mode: D <br>
     Move Mode: M <br>
     <br>
     <u><strong>Create a link:</strong></u> Type two nodes into the text boxes. <br>
     <br>
     <strong>Current Mode: </strong> <em>{{this.mode}}</em> <br>
     <br> </p>
    <input v-model="n1" type="text" name="from" id="from">
    <input v-model="n2" type="text" name="to" id="to">
    <button type="button" name="create" id="create" v-on:click="addEdge">Create Edge</button>
    <cytoscape
      ref="cyRef"
      :config="config"
      v-on:click.native="addNode"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:cxttapstart="deleteNode($event, def.data.id)"
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
      n1: "",
      n2: "",
      mode: "Create"
    };
  },
  mounted(){
    this.tid = this.$store.getters.getActiveTree
    this.$store.commit("addTree", { id: this.tid, nodes: [], edges: [] })
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
        let node = { group: "nodes", data: { id: ++this.count }, renderedPosition: { x: event.screenX, y: event.screenY } }
        console.log(event)
        this.elements.push(node)
    },
    addEdge(event) {
      let treeNodes = this.$store.getters.getTreeNodes
      let edge = {
        to   : treeNodes.filter((node) => node.id == this.n2),
        from : treeNodes.filter((node) => node.id == this.n1),
        label : ""
      }
      this.$store.commit("addEdge", edge)
      let newEdge = {
        data: { id: `${this.n1}${this.n2}`, source: this.n1, target: this.n2 },
        group : "edges"
      }
      this.elements.push(newEdge)
    },
    deleteEdge(id){
      delete this.$store.getters.getTreeEdges( this.tid)[id]
    },
    deleteNode(event, id) {
      // delete this.$store.getters.getTreeNodes( this.tid)[id]
      this.$store.commit("removeNode", id)
      console.log("node clicked", id);
      let node = this.$refs.cyRef.instance.$(`#${id}`)
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
