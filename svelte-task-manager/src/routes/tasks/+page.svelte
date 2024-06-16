<script>
  import TaskForm from "$lib/TaskForm.svelte";
  import { taskStore } from "$lib/stores/taskStore";
  import { onDestroy, onMount } from "svelte";

  let categories = ["Work", "Personal", "Urgent"];
  let tasks = [];

  onMount(() => {
    console.log("onMount");
    taskStore.subscribe((value) => {
      tasks = value;
    });
  });

  const addTask = (task) => {
    taskStore.addTask(task);
  };
</script>

<h1>Task Manager</h1>
<TaskForm {categories} on:submit={addTask} />
