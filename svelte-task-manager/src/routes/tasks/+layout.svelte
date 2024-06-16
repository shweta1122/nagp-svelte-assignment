<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    let isTokenChecked = false;
  
    onMount(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        goto('/login', { replaceState: true });
      } else {
        isTokenChecked = true;
      }
    });
  
    $: currentRoute = $page.url.pathname;
  </script>
  
  {#if isTokenChecked}
    <slot />
  {:else}
    <p>Loading...</p>
  {/if}
  