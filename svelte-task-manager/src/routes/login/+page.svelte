<script>
    import { userStore } from '$lib/stores/userStore';
    import { goto } from '$app/navigation';

    let username = '';
    let password = '';

    async function handleLogin() {
        try {
            await userStore.login(username, password);
            goto('/');
        } catch (error) {
            alert(error.message);
        }
    }
</script>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f4f8;
    }

    .login-form {
        background: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
    }

    .login-form h1 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        text-align: center;
        color: #333;
    }

    .login-form label {
        display: block;
        margin-bottom: 0.5rem;
        color: #555;
    }

    .login-form input {
        width: calc(100% - 1rem);
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .login-form button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }

    .login-form button:hover {
        background-color: #0056b3;
    }
</style>

<main>
    <div class="login-form">
        <h1>Login</h1>
        <form on:submit|preventDefault={handleLogin}>
            <label for="username">Username:</label>
            <input type="text" id="username" bind:value={username} placeholder="Enter your username" required />
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} placeholder="Enter your password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</main>
