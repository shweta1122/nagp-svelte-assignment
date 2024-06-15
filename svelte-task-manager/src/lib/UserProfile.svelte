<script>
    export let user;
  </script>
  
  <div class="user-profile">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
  
  <style>
    .user-profile {
      border: 1px solid #ccc;
      padding: 1rem;
      margin: 1rem 0;
    }
  </style>
  