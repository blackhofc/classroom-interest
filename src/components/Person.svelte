<!-- PersonCard.svelte -->
<script>
  export let selectedNode;
</script>

<div class="person-card">
  <p class="simple-text">
    Name: <span class="dynamic-text">{selectedNode.label}</span>
  </p>
  <p class="simple-text">
    Age: <span class="dynamic-text">{selectedNode.age}</span>
  </p>
  <p class="simple-text">
    Gender: <span class="dynamic-text">{selectedNode.gender}</span>
  </p>
  <p class="simple-text">
    Music Genres: <span class="dynamic-text"
      >{selectedNode.genres.join(", ")}</span
    >
  </p>
  <p class="simple-text">
    Sports: <span class="dynamic-text">{selectedNode.sports.join(", ")}</span>
  </p>
  <p class="simple-text">
    Languages: <span class="dynamic-text"
      >{selectedNode.languages.join(", ")}</span
    >
  </p>
</div>

<style>
  .person-card {
    height: auto;
    background-color: #2f3032;
    margin: 15px 15px 0; /* Top margin 20px, horizontal margins 20px, bottom margin 0 */
    padding: 10px 20px; /* Horizontal padding */
    border-radius: 4px;
  }

  .simple-text {
    margin: 4px 0;
    font-size: 16px;
    color: white;
    font-weight: bold;
  }

  .dynamic-text {
    font-size: 14px;
    color: #ffffff;
    font-weight: normal;
  }
</style>
