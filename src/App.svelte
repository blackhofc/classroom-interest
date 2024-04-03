<script>
  import { onMount } from "svelte";
  import { Network } from "vis-network";
  import Select from "svelte-select";

  // Components
  import COLORS from "./utils/constants.js";
  import PersonCard from "./components/Person.svelte";
  import RelationCard from "./components/Relation.svelte";

  import { groupStudents, filters } from "./utils/filters.js";

  // Import the parsed students data
  import students from "./students.json";

  let selectedNode = null;
  let selectedNodeRelations = [];

  var nodes = [];

  let justValue = "class";

  const findMyRelations = (edges, id) => {
    const relations = edges.reduce((relations, { from, to }) => {
      if (from === id)
        relations.push(nodes.find((student) => student.id === to));
      else if (to === id)
        relations.push(nodes.find((student) => student.id === from));
      return relations;
    }, []);
    // console.log(`relations of [${id}] ---> ${relations}`);
    console.log(`--->[${id}] has ${relations.length} relations`);
    return relations;
  };

  // Load student nodes with its values
  students.forEach((person) => {
    const { name, age, gender } = person;
    nodes.push({
      ...person,
      label: name,
      color: COLORS[gender] || "#F5A800",
      size: age * 0.5,
    });
  });

  // Draw canvas with current filter selected 'justValue'
  function draw() {
    console.log("justValue", justValue);
    var edges = groupStudents(students, justValue);
    selectedNodeRelations = findMyRelations(edges, selectedNode?.id);

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
        color: "#74747A", // Link color
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
        selectedNodeRelations = findMyRelations(edges, node?.id);
      }
    });

    // Adjust students network on window resize
    window.onresize = function () {
      setInterval(function () {
        network.fit();
      }, 2000);
    };
  }

  // On website mounted
  onMount(() => {
    // Default node (me)
    selectedNode = nodes.find((student) => student.id === 8);

    // Draw canvas with default filter 'classroom'
    draw();
  });
</script>

<div class="container">
  <div class="left-div">
    <div class="title">Classroom Interests</div>

    {#if selectedNode}
      <div class="sub-title">Student</div>
      <PersonCard {selectedNode} />
    {/if}

    {#if selectedNode && selectedNodeRelations.length > 0}
      <div class="sub-title">
        {selectedNodeRelations.length} Students in the same group as {selectedNode.name.split(
          " "
        )[0]}
      </div>

      <div class="relation-cards-container" id="relationCardsContainer">
        {#each selectedNodeRelations as relation}
          <RelationCard {justValue} {relation} />
        {/each}
      </div>
    {/if}

    <div class="dite-logo">
      <a
        href="https://docs.google.com/spreadsheets/d/1fiIBpUYMtGCTEr7ojjqdm8oesV9ByKjP4-8B0DEJWZg/edit?usp=sharing"
        target="_blank"
      >
        <img
          src="../images/ditella.png"
          alt="ditella"
          style="width: 65px; height: auto;"
        />
      </a>
    </div>
  </div>
  <form class="form-container">
    <label for="foo" style="color: aliceblue;">Filter</label>

    <Select items={filters} bind:justValue on:change={draw} />
  </form>
  <div
    id="students-network"
    style="width: calc(100% - 200px); height: 100vh; background: #343B46; "
  ></div>
</div>

<style>
  .container {
    display: flex;
    position: relative;
  }

  .left-div {
    position: relative;
    width: 20vw;
    height: 100vh;
    background-color: #222325;
    padding-right: 10px;
    padding-left: 10px;
  }

  .form-container {
    position: absolute;
    top: 0;
    transform: translateX(-140%); /* Move the form back to the left */
    width: 15vw;
    background-color: transparent; /* Change background color to transparent */
    padding: 10px;
    z-index: 1; /* Set a higher z-index to prioritize clicks */
  }

  .title {
    margin-top: 20px;
    text-decoration: none;
    font-size: 30px;
    font-style: initial;
    background-image: linear-gradient(to right, #e52f89, #57bdba, #f5a800);
    color: transparent;
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: animateGradient 10s linear infinite;
  }

  @keyframes animateGradient {
    0% {
      background-position: 200% 50%;
    }
    50% {
      background-position: 0% 50%;
    }
    100% {
      background-position: -200% 50%;
    }
  }

  .relation-cards-container::-webkit-scrollbar {
    display: none; /* Hide the scrollbar */
  }

  .relation-cards-container {
    display: flex;
    overflow-x: auto; /* Add horizontal scroll if necessary  overflow-x: hidden; to hide */
    gap: 0px; /* Adjust spacing between cards */
    padding-top: 5px;
    padding-bottom: 15px;
  }

  /* Apply styles directly to the child component's root element */
  :global(.similar-card) {
    padding: 10px 15px; /* Vertical padding of 10px, horizontal padding of 20px */
    flex-shrink: 0; /* Ensure the card does not shrink */
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
    text-align: center;
  }
</style>
