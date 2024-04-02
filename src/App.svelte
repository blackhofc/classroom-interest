<script>
  import { onMount } from "svelte";
  import { Network } from "vis-network";

  // Components
  import PersonCard from "./components/Person.svelte";
  // import Filter from './components/Selector.svelte';
  import COLORS from "./utils/constants.js";
  import { Section, Gender, Language } from "./utils/filters.js";

  // Import the JSON data
  import students from "./students.json";
  import { select } from "d3";

  let selectedNode = null;

  var nodes = [];

  students.forEach((person) => {
    const { id, name, age, gender } = person;
    nodes.push({
      ...person,
      label: name,
      color: COLORS[gender] || "#F5A800",
      size: age * 0.5,
    });
  });

  function groupEdges(filter) {
    switch (filter) {
      case "age":
        Gender(students);
        break;
      case "gender":
        Gender(students);
        break;
      case "genres":
        Language(students);
        break;
      case "sports":
        Language(students);
        break;
      case "language":
        Language(students);
        break;
      default:
        Section(students);
        break;
    }
  }

  function draw() {
    var edges = Section(students);

    // Container to hold the network
    const container = document.getElementById("students-network");

    // Data and options for the network
    const data = { nodes, edges };

    const options = {
      nodes: {
        shape: "dot",
        font: {
          color: "white", // Label color
        },
      },
      edges: {
        color: "#F4F7FF", // Link color
        hoverWidth: 0,
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -25,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 5,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 1 },
      },
    };

    // Create the network
    const network = new Network(container, data, options);

    // Add event listener for node click
    network.on("click", function (event) {
      const nodeId = event.nodes[0]; // Get the first selected node
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        selectedNode = node;
      }
    });
  }

  onMount(() => {
    selectedNode = nodes.find((student) => student.id === 6);
    draw();
  });
</script>

<div class="container">
  <div class="left-div">
    <div class="title">Classroom Interests</div>
    {#if selectedNode}
      <div class="sub-title">Student</div>
      <PersonCard {selectedNode} />
      <div class="dite-logo">
        <img
          src="../images/ditella.png"
          alt="ditella"
          style="width: 65px; height: auto;"
        />
      </div>
    {/if}
  </div>

  <div
    id="students-network"
    style="width: calc(100% - 200px); height: 100vh; background: #343B46; float: right;"
  ></div>
</div>

<style>
  .container {
    display: flex;
  }

  .left-div {
    position: relative;
    width: 20vw;
    height: 100vh;
    background-color: #222325;
    justify-content: center; /* Center horizontally */
  }

  .title {
    color: white;
    margin-top: 20px;
    text-decoration: none;
    font-size: 22px;
    font-style: initial;
  }

  .sub-title {
    color: #74747a;
    margin-top: 20px;
    margin-left: 16px;
    text-decoration: none;
    font-size: 16px;
    font-style: bold;
  }

  .dite-logo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    text-align: center; /* Optional: Center text content */
  }
</style>
