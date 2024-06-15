<script>
  import { taskStore } from "$lib/stores/taskStore";
  import TaskCard from "$lib/TaskCard.svelte";
  import { onDestroy } from "svelte";

  let tasks = [
    {
      id: 1,
      title: "Task 1",
      category: "Work",
      dueDate: "2022-12-12",
      status: "Pending",
    },
    {
      id: 2,
      title: "Task 2",
      category: "Personal",
      dueDate: "2022-12-10",
      status: "Completed",
    },
    {
      id: 3,
      title: "Task 3",
      category: "Work",
      dueDate: "2022-12-14",
      status: "Pending",
    }
  ];

  let sortedTasks = [...tasks];

  // Function to sort tasks by status
  const sortTasksByStatus = () => {
    sortedTasks = [...tasks].sort((a, b) => a.status === 'Pending' ? -1 : 1);
  };

  // Function to sort tasks by due date
  const sortTasksByDate = () => {
    sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  // Subscribe to the task store reactively
  // const unsubscribe = taskStore.subscribe((value) => {
  //   tasks = value;
  //   sortedTasks = [...tasks]; // Reset sortedTasks to match the latest tasks
  // });

  // Cleanup subscription on component destruction
  // onDestroy(() => {
  //   unsubscribe();
  // });

  const deleteTask = (id) => {
    taskStore.deleteTask(id);
    tasks = tasks.filter(task => task.id !== id);
    sortedTasks = [...tasks]; // Update sortedTasks to reflect the deletion
  };
</script>

<div>
  <div class="sort-buttons">
    <button on:click={sortTasksByStatus}>Sort by Status</button>
    <button on:click={sortTasksByDate}>Sort by Due Date</button>
  </div>
  <div class="task-list">
    {#if sortedTasks.length > 0}
      {#each sortedTasks as task (task.id)}
        <TaskCard {task} on:delete={() => deleteTask(task.id)} />
      {/each}
    {:else}
      <p>No tasks available.</p>
    {/if}
  </div>
</div>

<style>
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
