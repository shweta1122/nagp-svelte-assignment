<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export let categories = [];
  const dispatch = createEventDispatcher();
  
  let title = '';
  let category = categories[0] || '';
  let dueDate = '';
  let status = 'pending';

  onMount(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  });

  const submitTask = () => {
    dispatch('submit', { title, category, dueDate, status });
    // Optionally, clear the form after submission
    title = '';
    category = categories[0] || '';
    dueDate = '';
    status = 'pending';
  };
</script>

<form on:submit|preventDefault={submitTask}>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" bind:value={title} placeholder="Title" required />
  </div>

  <div class="form-group">
    <label for="category">Category</label>
    <select id="category" bind:value={category}>
      {#each categories as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  <div class="form-group">
    <label for="dueDate">Due Date</label>
    <input type="date" id="dueDate" bind:value={dueDate} required />
  </div>

  <div class="form-group">
    <label for="status">Status</label>
    <select id="status" bind:value={status}>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  <button type="submit">Save Task</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input, select, button {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #007bff;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 600px) {
    form {
      padding: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      margin-bottom: 0.25rem;
    }
  }
</style>
