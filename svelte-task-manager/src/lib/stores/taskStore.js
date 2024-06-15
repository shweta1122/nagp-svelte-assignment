// src/lib/stores/taskStore.js
import { writable } from 'svelte/store';

const tasks = writable([]);

export const taskStore = {
  subscribe: tasks.subscribe,
  setTasks: (taskArray) => {
    console.log(taskArray, 'setTasks in store');
    tasks.set(taskArray);
  },
  addTask: (task) => {
    console.log(task, 'addTask in store');
    tasks.update(t => [...t, { ...task, id: t.length + 1 }]);
  },
  updateTask: (updatedTask) => {
    console.log(updatedTask, 'updatedTask in store');
    tasks.update(t => t.map(task => task.id === updatedTask.id ? updatedTask : task));
  },
  deleteTask: (id) => {
    console.log(id);
    tasks.update(t => t.filter(task => task.id !== id));
  }
};
