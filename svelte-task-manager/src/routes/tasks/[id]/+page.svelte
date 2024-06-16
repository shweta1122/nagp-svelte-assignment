<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  let task;
  let id;
  let loading = true;
  let error = false;

  onMount(() => {
    id = get(page).params.id;
    const storedTasks = localStorage.getItem("tasks.detail");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      task = tasks.find(t => t.id.toString() === id);
      loading = false;
    } else {
      error = true;
      loading = false;
    }

    if (!task) {
      task = {
        title: "Task not found",
        description: "The task you are looking for does not exist.",
        category: "",
        dueDate: "",
        status: ""
      };
      error = true;
    }
  });
</script>

{#if loading}
  <div class="loading">Loading...</div>
{:else}
  {#if error}
    <div class="error">{task.description}</div>
  {:else}
    <div class="task-detail">
      <h1>{task.title}</h1>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p>{task.description}</p>
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
  .task-detail {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  .task-detail h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  .task-detail p {
    margin: 0.5rem 0;
  }
  .task-detail p strong {
    color: #333;
  }
</style>
