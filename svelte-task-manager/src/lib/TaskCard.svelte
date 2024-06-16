<script>
  import { createEventDispatcher } from 'svelte';

  export let task;

  const dispatch = createEventDispatcher();

  const handleDelete = () => {
    dispatch('delete');
  };
</script>

<div class="task-card">
  <div class="task-details">
    <h2>{task.title}</h2>
    <p class="category">{task.category}</p>
    <p class="due-date">Due: {task.dueDate}</p>
    <p class="status {task.status === 'Pending' ? 'pending' : 'completed'}">{task.status}</p>
  </div>
  <button class="delete-button" on:click={handleDelete}>Delete</button>
</div>

<style>
  .task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .task-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .task-details {
    flex: 1;
  }

  .task-details h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  .category {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .due-date {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .status {
    font-size: 0.9rem;
  }

  .status.pending {
    color: #d9534f;
  }

  .status.completed {
    color: #5cb85c;
  }

  .delete-button {
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .delete-button:hover {
    background-color: #c9302c;
  }
</style>
