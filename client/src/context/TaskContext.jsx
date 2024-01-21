import { createContext, useContext, useState } from "react";
import { get_tasks_request, create_task_request, delete_task_request, get_task_request, update_task_request } from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider ');
    }

    return context;
}

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const get_tasks = async () => {
        try {
            const res = await get_tasks_request();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const create_task = async (task) => {
        try {
            const res = await create_task_request(task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const delete_task = async (id) => {
        try {
            const res = await delete_task_request(id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const get_task = async (id) => {
        try {
            const res = await get_task_request(id);

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const update_task = async (id, task) => {
        try {
            await update_task_request(id, task);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, create_task, get_tasks, delete_task, get_task, update_task }}>
            {children}
        </TaskContext.Provider>
    );
}