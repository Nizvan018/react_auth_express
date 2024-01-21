import axios from './axios';

export const get_tasks_request = () => axios.get('/tasks');

export const get_task_request = (id) => axios.get(`/tasks/${id}`);

export const create_task_request = (task) => axios.post('/tasks', task);

export const update_task_request = (id, task) => axios.put(`/tasks/${id}`, task);

export const delete_task_request = (id) => axios.delete(`/tasks/${id}`);
