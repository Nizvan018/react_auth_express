import { FaEdit, FaCheck } from 'react-icons/fa';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
    const { delete_task } = useTasks();

    return (
        <div className='group relative h-fit p-6 rounded-lg border border-zinc-700/50 shadow-md shadow-zinc-900/0 cursor-pointer duration-300 hover:shadow-zinc-900/100 hover:border-zinc-700/80'>
            <div className="absolute opacity-0 -right-2 -top-2 flex gap-2 duration-300 group-hover:opacity-100">
                <Link to={`/tasks/${task._id}`} className="overflow-hidden group relative flex items-center p-2 rounded-lg bg-white cursor-pointer duration-300 ease-in-out hover:pr-14">
                    <FaEdit className="text-black" />
                    <span className="absolute left-5 ml-4 font-medium text-sm text-black transition-opacity duration-300 opacity-0 group-hover:opacity-100">Editar</span>
                </Link>
                <button onClick={() => delete_task(task._id)} className="overflow-hidden group relative flex items-center p-2 rounded-lg bg-white cursor-pointer duration-300 ease-in-out hover:pr-14 hover:bg-green-400">
                    <FaCheck className="text-black" />
                    <span className="absolute left-5 ml-4 font-medium text-sm text-black transition-opacity duration-300 opacity-0 group-hover:opacity-100">Hecho</span>
                </button>
            </div>
            <h3 className='mb-2'>{task.title}</h3>
            <p className="mb-2 text-gray-400">{task.description}</p>
            <p className="text-gray-400 text-xs font-medium">{new Date(task.date).toLocaleDateString()}</p>
        </div>
    )
}

export default TaskCard;