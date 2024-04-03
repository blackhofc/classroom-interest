<!-- Relation.svelte -->
<script>
  export let justValue;
  export let relation;

  const getValue = (key) => {
    if (relation[key]) {
      return Array.isArray(relation[key])
        ? relation[key].join(", ")
        : relation[key];
    }
    return null;
  };
</script>

<div class="similar-card">
  <p class="simple-text">{relation.label}</p>

  {#if justValue === "age" || justValue === "gender" || justValue === "music_genres" || justValue === "fav_sports" || justValue === "languages"}
    <p class="simple-text">
      {#if justValue === "age"}
        Age:
      {/if}
      {#if justValue === "gender"}
        Gender:
      {/if}
      {#if justValue === "music_genres"}
        Music Genres:
      {/if}
      {#if justValue === "fav_sports"}
        Favorite Sports:
      {/if}
      {#if justValue === "languages"}
        Languages:
      {/if}
      <span class="dynamic-text">{getValue(justValue)}</span>
    </p>
  {/if}
</div>

<style>
  .similar-card {
    height: auto;
    margin: 15px 15px 0;
    border-radius: 4px;
    color: transparent;
    background-image: linear-gradient(to left, #f5a800, #57bdba, #e52f89);
    background-size: 200% 100%;
    animation: animateGradient 10s linear infinite;
  }

  @keyframes animateGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .simple-text {
    margin: 4px 0;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
  }

  .dynamic-text {
    font-size: 14px;
    color: #ffffff;
    font-weight: normal;
  }
</style>
