<script>
  import { onMount } from 'svelte';
</script>

<header>
  <nav>
    <div class="left-nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/tasks">Task Manager</a>
    </div>
    <div class="right-nav">
      <a href="register">Sign In</a>
      <a href="/login">Login</a>
    </div>
  </nav>
</header>

<main>
  <slot></slot>
</main>

<footer>
  <p>© 2024 Personal Task Manager</p>
</footer>

<style>
  header, footer {
    background: #333;
    color: white;
    padding: 1rem;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left-nav a, .right-nav a {
    margin: 0 1rem;
    color: white;
    text-decoration: none;
  }
  .right-nav {
    margin-left: auto;
  }
</style>
