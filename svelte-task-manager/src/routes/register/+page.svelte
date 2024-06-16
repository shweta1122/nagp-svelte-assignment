<script>
    import { goto } from '$app/navigation';

    let username = '';
    let password = '';

    async function register() {
        const response = await fetch('https://nagp-svelte-assignment-sigma.vercel.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            goto('/login');
        } else {
            const error = await response.json();
            alert(error.error);
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

    .register-form {
        background: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
    }

    .register-form h1 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        text-align: center;
        color: #333;
    }

    .register-form label {
        display: block;
        margin-bottom: 0.5rem;
        color: #555;
    }

    .register-form input {
        width: calc(100% - 1rem);
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .register-form button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }

    .register-form button:hover {
        background-color: #0056b3;
    }
</style>

<main>
    <div class="register-form">
        <h1>Register</h1>
        <form on:submit|preventDefault={register}>
            <label for="username">Username:</label>
            <input type="text" id="username" bind:value={username} placeholder="Enter your username" required />
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} placeholder="Enter your password" required />
            <button type="submit">Register</button>
        </form>
    </div>
</main>
