import { writable } from "svelte/store";

const user = writable(null);

async function register(username, password) {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
}

async function login(username, password) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem("token", token);
    const userData = parseJwt(token); // Decode the JWT to get user data
    user.set(userData);
    console.log(userData, "logged in user data");
  } else {
    const error = await response.json();
    console.log(error.error, "error");
    throw new Error(error.error);
  }
}

function logout() {
  localStorage.removeItem("token");
  user.set(null);
}

function initialize() {
  const token = localStorage.getItem("token");
  if (token) {
    const userData = jwtDecode(token); // Decode the JWT to get user data
    user.set(userData);
  }
}

function parseJwt(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const userStore = {
  subscribe: user.subscribe,
  register,
  login,
  logout,
  initialize,
};
