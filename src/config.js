const config = {
    elements: [
      {
        data: { id: "a" },
        position: { x: 589, y: 182 },
        group: "nodes"
      },
      {
        data: { id: "b" },
        position: { x: 689, y: 282 },
        group: "nodes"
      },
      {
        data: { id: "c" },
        position: { x: 489, y: 282 },
        group: "nodes"
      },
      {
        data: { id: "ab", source: "a", target: "b" },
        group: "edges"
      }
    ],
    style: [
      {
        selector: "node",
        style: { "background-color": "#666", label: "data(id)" }
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle"
        }
      }
    ],
    layout: { name: "grid", rows: 1 }
  };
  
  export default config;
  