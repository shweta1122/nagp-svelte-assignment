<script>
  import TaskCard from "$lib/TaskCard.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let tasks = writable([]);
  let sortedTasks = writable([]);
  const loading = writable(true);

  const fetchAndSetTasks = async () => {
    const storedTasks = localStorage.getItem("tasks.detail");
    console.log("storedTasks", storedTasks);
    if (storedTasks) {
      tasks.set(JSON.parse(storedTasks).map((task, index) => ({
        ...task,
        id: task.id || index // Ensure each task has a unique id
      })));
      console.log("tasks", $tasks);
    }
    loading.set(false);
  };

  onMount(fetchAndSetTasks);

  $: sortedTasks.set([...$tasks]);

  // Function to sort tasks by status
  const sortTasksByStatus = () => {
    sortedTasks.set([...$tasks].sort((a, b) => (a.status === "Pending" ? -1 : 1)));
  };

  // Function to sort tasks by due date
  const sortTasksByDate = () => {
    sortedTasks.set([...$tasks].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    ));
  };

  const deleteTask = (id) => {
    console.log("Task deleted:", id);

    // Update the local tasks array and local storage
    tasks.update(t => {
      const updatedTasks = t.filter((task) => task.id !== id);
      localStorage.setItem("tasks.detail", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    // Update the sortedTasks array
    sortedTasks.update(t => t.filter((task) => task.id !== id));

    // Re-fetch and set tasks to ensure everything is updated correctly
    fetchAndSetTasks();
  };
</script>

<div>
  {#if $loading}
    <div class="loading">Loading...</div>
  {:else}
    <div class="sort-buttons">
      <button on:click={sortTasksByStatus}>Sort by Status</button>
      <button on:click={sortTasksByDate}>Sort by Due Date</button>
    </div>
    <div class="task-list">
      {#if $sortedTasks.length > 0}
        {#each $sortedTasks as task (task.id)}
          <TaskCard {task} on:delete={() => deleteTask(task.id)} />
        {/each}
      {:else}
        <p>No tasks available.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .loading {
    font-size: 1.5rem;
    text-align: center;
    padding: 2rem;
  }
  .sort-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 800px;
    margin: auto;
  }
</style>
