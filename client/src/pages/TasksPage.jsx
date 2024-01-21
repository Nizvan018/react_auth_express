import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';
import { useEffect } from 'react';

function TasksPage() {
    const { get_tasks, tasks } = useTasks();

    useEffect(() => {
        get_tasks();
    }, [get_tasks]);

    return (
        <>
            <Navbar />

            <div className='flex flex-col items-center'>

                <main className='w-full p-12'>
                    <h1 className='mb-10'>Mis tareas creadas</h1>

                    <section className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
                        {tasks.map(task => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </section>
                </main>
            </div>
        </>
    )
}

export default TasksPage;