<div>
<cytoscape ref="cy" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode">
  <cy-element
    v-for="def in elements"
    :key="`${def.data.id}`"
    :definition="def"
    v-on:mousedown="deleteNode($event, def.data.id)"
  />
</cytoscape>
</div>

const config = {
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    }, {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'grid',
    rows: 1
  }
}
