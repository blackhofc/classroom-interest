<!-- PersonCard.svelte -->
<script>
  export let selectedNode;
</script>

<div class="person-card">
  <p class="simple-text-animated">
    {selectedNode.label}
  </p>
  <p class="simple-text">
    Age: <span class="dynamic-text">{selectedNode.age}</span>
  </p>
  <p class="simple-text">
    Gender: <span class="dynamic-text">{selectedNode.gender}</span>
  </p>
  <p class="simple-text">
    Music Genres: <span class="dynamic-text"
      >{selectedNode.music_genres.join(", ")}</span
    >
  </p>
  <p class="simple-text">
    Favorite Sports: <span class="dynamic-text"
      >{selectedNode.fav_sports.join(", ")}</span
    >
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

  .simple-text-animated {
    margin: 4px 0;
    font-size: 16px;
    color: white;
    font-weight: bold;
    text-decoration: none;
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
