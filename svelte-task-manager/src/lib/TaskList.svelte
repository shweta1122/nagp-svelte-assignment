<script>
  import { taskStore } from "$lib/stores/taskStore"; // Adjust the path as needed
  import TaskCard from "$lib/TaskCard.svelte";
  import { onDestroy } from "svelte";

  let tasks = [{ id: 1, title: "Task 1", description: "Description 1"}];

  // Subscribe to the task store reactively
  // const unsubscribe = taskStore.subscribe((value) => {
  //   tasks = value;
  //   console.log("Tasks updated:", tasks); // Debugging line
  // });

  // Cleanup subscription on component destruction
  // onDestroy(() => {
  //   unsubscribe();
  // });

  const deleteTask = (id) => {
    taskStore.deleteTask(id);
  };
</script>

<div class="task-list">
  {#if tasks.length > 0}
    {#each tasks as task (task.id)}
      <TaskCard {task} on:delete={() => deleteTask(task.id)} />
    {/each}
  {:else}
    <p>No tasks available.</p>
  {/if}
</div>

<style>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 800px;
    margin: auto;
  }
</style>