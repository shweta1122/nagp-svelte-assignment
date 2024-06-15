import { writable } from 'svelte/store';

const user = writable(null);

async function register(username, password) {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
}

async function login(username, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        const userData = jwtDecode(token);  // Decode the JWT to get user data
        user.set(userData);
        console.log(userData,'logged in user data');
    } else {
        const error = await response.json();
        console.log(error.error,'error');
        throw new Error(error.error);
    }
}

function logout() {
    localStorage.removeItem('token');
    user.set(null);
}

function initialize() {
    const token = localStorage.getItem('token');
    if (token) {
        const userData = jwtDecode(token);  // Decode the JWT to get user data
        user.set(userData);
    }
}

export const userStore = {
    subscribe: user.subscribe,
    register,
    login,
    logout,
    initialize
};
