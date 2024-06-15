<script context="module">
    export async function load({ params }) {
      return {
        category: params.category
      };
    }
  </script>
  
  <script>
    export let category;
    import TaskList from '$lib/TaskList.svelte';
  </script>
  
  <h1>Tasks in {category}</h1>
  <TaskList {category} />
  