import { useForm } from 'react-hook-form';
import { SiTask } from 'react-icons/si';
import { Toaster, toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTasks } from '../context/TaskContext';
import { useEffect } from 'react';

function TaskFormPage() {
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { create_task, get_task, update_task } = useTasks();

    useEffect(() => {
        async function load_task() {
            if (params.id) {
                const task = await get_task(params.id);
                setValue('title', task.title);
                setValue('description', task.description);
            }
        }

        load_task();
    }, []);

    const on_submit = handleSubmit((data) => {
        if (params.id) {
            update_task(params.id, data);
        } else {
            create_task(data);
        }

        navigate('/tasks');
    });

    const cancel = (e) => {
        e.preventDefault();
        navigate('/tasks');
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-3" style={{ height: 'calc(100vh - 100px)' }}>
                <Toaster position='top-center' visibleToasts={1} theme='dark' />

                <div className="flex flex-col items-center justify-center w-full max-w-sm min-h-full">
                    <form className="flex flex-col gap-1 w-full px-4 py-8 rounded-lg border-y border-zinc-700/80 shadow-mdshadow-zinc-900">
                        <div className='flex'>
                            {params.id ?
                                <h1 className="w-full text-3xl mb-10">Editar tarea</h1>
                                :
                                <h1 className="w-full text-3xl mb-10">Crear tarea</h1>
                            }
                            <SiTask className='w-fit text-4xl text-center mb-1' />
                        </div>

                        {/* Titulo */}
                        <label className="mt-2">Título</label>
                        <input {
                            ...(register('title', {
                                required: {
                                    value: true,
                                    message: 'Introduzca el título'
                                }
                            }))
                        } type="text" placeholder="Dale un título a tu tarea" className={errors.title ? 'outline outline-rose-500/50' : ''} />
                        {errors.title && (
                            <span className='pl-2 text-xs text-rose-500/50'>{errors.title.message}</span>
                        )}

                        {/* Descripción */}
                        <label className="mt-2">Descripción</label>
                        <textarea {
                            ...(register('description', {
                                required: {
                                    value: true,
                                    message: 'Introduzca la descripción'
                                }
                            }))
                        } placeholder="¿Qué es lo que vas a hacer?" rows={5} className={errors.description ? 'outline outline-rose-500/50' : ''}></textarea>
                        {errors.description && (
                            <span className='pl-2 text-xs text-rose-500/50'>{errors.description.message}</span>
                        )}

                        {/* Botones */}
                        <div className="flex justify-between gap-2 mt-4">
                            <button onClick={on_submit} className="button-white w-full">Confirmar</button>
                            <button onClick={cancel} className="button-black w-full">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TaskFormPage