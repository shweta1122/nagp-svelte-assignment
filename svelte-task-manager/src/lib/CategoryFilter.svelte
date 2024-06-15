<script>
    export let categories = [];
    export let onFilter;
  
    let selectedCategory = '';
  </script>
  
  <select bind:value={selectedCategory} on:change={() => onFilter(selectedCategory)}>
    <option value="">All</option>
    {#each categories as category}
      <option value={category}>{category}</option>
    {/each}
  </select>
  
  <style>
    select {
      margin: 1rem 0;
    }
  </style>
  