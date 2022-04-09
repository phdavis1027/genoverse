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
     <br>
     <u><strong>Create a link:</strong></u> Type two nodes into the text boxes. <br>
     <br>
     <strong>Current Mode: </strong> <em>{{this.mode}}</em> <br>
     <br> </p>
    <input v-model="n1" type="text" name="from" id="from" style=background-color:#ff901f>
    <input v-model="n2" type="text" name="to" id="to" style=background-color:#ff901f>
    <button type="button" name="create" id="create" v-on:click="addEdge">Create Edge</button> <br>
    <button type="button" name='dfs' id='dfs' v-on:click="dfs">Depth First Search</button> <span style=color:#ffd319>DFS: {{this.output}}</span> <br>
    <button type="button" name="deleteAll" id="deleteAll" v-on:click="deleteAll">Delete All</button>
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

  <div>
    <strong >
    <pre style="color: ##ff901f">


____   ____          ____   ____                        
\   \ /   /_ __   ___\   \ /   /___ ___.__. ___________ 
 \   Y   /  |  \_/ __ \   Y   /  _    |  |/ __ \_  __ \
  \     /|  |  /\  ___/\     (   _> )___  \  ___/|  | \/
   \___/ |____/  \___  >\___/ \____// ____|\___  >__|   
                     \/             \/         \/       



    </pre>
    </strong>

  </div>

    </div>
</template>
<style>
body {
  background-color: #8c1eff;
}
</style>
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
      n1: "",
      n2: "",
      mode: "Move",
      output: ""
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
            this.mode = "Create"
         }
         else {
          this.creMode = false;
          this.mode = "Move"
         }
    },
    setDelMode() {
      if (!this.delMode) {
        this.delMode = true;
        this.creMode = false;
        this.mode = "Delete"
      }
      else {
        this.delMode = false;
        this.mode = "Move"
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
          let node = { group: "nodes", data: {id: ++this.count}, renderedPosition: {x: event.offsetX, y: event.offsetY}}
          this.elements.push(node)
      }
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
      if(this.delMode == true) {
        this.$store.commit("removeNode", id)
        let node = this.$refs.cyRef.instance.$(`#${id}`)
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
    },
    dfs() {
      this.output = ""
      let visited = new Array(this.$store.getters.getTreeNodes.length)
      let pred = new Array(this.$store.getters.getTreeNodes.length) 
      for(let i = 0; i < visited.length; ++i) {
        if (!visited[i]) this.dfsVisit(visited, pred, i)
      }
      //this.dfsVisit(visited, this.$store.getters.getTreeNodes[0])
    },
    dfsVisit(visited, pred, i) {
      visited[i] = true
      // await new Promise(r => setTimeout(r, 250))
      // this.$store.get
      this.output += `${i} `

      let edges = this.$store.getters.getTreeEdges
        .filter((edge) => edge.from == this.$store.getters.getTreeNodes[i].id)

      for (let j = 0; j < edges.length; ++j) {
        if (!visited[j]) {
          pred[j] = i
          this.dfsVisit(visited, pred, j)
        }
      }
    },

    animateNode(id){
      this.$cyref
    },
    deleteAll() {
      this.elements = []
      this.$store.commit("removeTree")
      this.$store.commit("addTree", tid)
      this.count = 0
    }
  }
};
</script>
