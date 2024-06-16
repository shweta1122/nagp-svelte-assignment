// src/lib/stores/taskStore.js
import { writable } from 'svelte/store';
import { setContext } from 'svelte';

const tasks = writable([]);

export const taskStore = {
  subscribe: tasks.subscribe,
  setTasks: (taskArray) => {
    console.log(taskArray, 'setTasks in store');
    tasks.set(taskArray);
  },
  addTask: (task) => {
    console.log(task, 'addTask in store');
    const updatedTasks = JSON.parse(localStorage.getItem('tasks.detail')) || [];
    updatedTasks.push(task.detail);
    localStorage.setItem('tasks.detail', JSON.stringify(updatedTasks));
    tasks.update(t => [...t, { ...task, id: t.length + 1 }]);
  },
  updateTask: (updatedTask) => {
    console.log(updatedTask, 'updatedTask in store');
    tasks.update(t => t.map(task => task.id === updatedTask.id ? updatedTask : task));
    setContext('tasks', tasks);
  },
  deleteTask: (id) => {
    console.log(id);
    tasks.update(t => t.filter(task => task.id !== id));
  }
};
