<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  let tasks = [];
  let category;
  let loading = true;
  let error = false;

  onMount(() => {
    category = get(page).params.category;
    const storedTasks = localStorage.getItem("tasks.detail");
    console.log(storedTasks,'storedTasks');

    if (storedTasks) {
      const allTasks = JSON.parse(storedTasks);
      tasks = allTasks.filter(t => t.category.toLowerCase() === category.toLowerCase());
      loading = false;

      if (tasks.length === 0) {
        error = true;
      }
    } else {
      error = true;
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="loading">Loading...</div>
{:else}
  {#if error}
    <div class="error">No tasks found for category: {category}</div>
  {:else}
    <div class="task-list">
      {#each tasks as task (task.id)}
        <div class="task-card">
          <h2>{task.title}</h2>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p>{task.category}</p>
        </div>
      {/each}
    </div>
  {/if}
{/if}

<style>
  .loading {
    font-size: 1.5rem;
    text-align: center;
    padding: 2rem;
  }
  .error {
    color: red;
    font-size: 1.5rem;
    text-align: center;
    padding: 2rem;
  }
  .task-list {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .task-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  .task-card h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  .task-card p {
    margin: 0.5rem 0;
  }
  .task-card p strong {
    color: #333;
  }
</style>
