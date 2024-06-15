<script>
  export let task;
  export let onDelete;
</script>

<div class="task-card">
  <h3>{task.title}</h3>
  <p>Category: {task.category}</p>
  <p>Due: {task.dueDate}</p>
  <p>Status: {task.status}</p>
  <button on:click={onDelete}>Delete</button>
</div>

<style>
  .task-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .task-card h3 {
    margin: 0;
  }

  .task-card button {
    align-self: flex-end;
    padding: 0.5rem 1rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .task-card button:hover {
    background-color: #c0392b;
  }
</style>
