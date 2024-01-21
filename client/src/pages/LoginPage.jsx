import { FaReact } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: login_errors, set_errors, is_authenticated } = useAuth();
    const navigate = useNavigate();

    const on_submit = handleSubmit(async (data) => {
        const res = await signin(data);
        console.log(res);
        navigate('/tasks');
    });

    if (login_errors != null) {
        toast.error(login_errors.message);
        set_errors(null);
    }

    const go_to_register = (e) => {
        e.preventDefault();
        navigate('/register');
    }

    useEffect(() => {
        if (is_authenticated) {
            navigate('/tasks');
        }
    }, []);

    return (
        <div className="flex justify-center h-screen">
            <Toaster position='top-center' visibleToasts={1} theme='dark' />

            <div className="flex flex-col items-center justify-center w-full max-w-xs min-h-full">
                <form className="flex flex-col gap-1 w-full px-4 py-8 rounded-lg border-y border-zinc-700/80 shadow-mdshadow-zinc-900">
                    <FaReact className='text-6xl text-center w-full mb-1' />
                    <h1 className="text-center text-3xl mb-10">Iniciar sesión</h1>

                    {/* Correo electrónico */}
                    <label className="mt-2">Correo electrónico</label>
                    <input {
                        ...(register('email', {
                            required: {
                                value: true,
                                message: 'Introduzca el correo electrónico'
                            }, pattern: {
                                value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
                                message: 'El correo no es válido'
                            }
                        }))
                    } type="email" placeholder="njr01397@gmail.com" className={errors.email ? 'outline outline-rose-500/50' : ''} />
                    {errors.email && (
                        <span className='pl-2 text-xs text-rose-500/50'>{errors.email.message}</span>
                    )}

                    {/* Contraseña */}
                    <label className="mt-2">Contraseña</label>
                    <input {
                        ...(register('password', {
                            required: {
                                value: true,
                                message: 'Introduzca el nombre del usuario'
                            },
                            minLength: {
                                value: 8,
                                message: 'La contraseña es muy corta'
                            },
                            maxLength: {
                                value: 40,
                                message: 'La contraseña es demasiado larga'
                            }
                        }))
                    } type="password" placeholder="********" className={errors.password ? 'outline outline-rose-500/50' : ''} />
                    {errors.password && (
                        <span className='pl-2 text-xs text-rose-500/50'>{errors.password.message}</span>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between gap-2 mt-4">
                        <button onClick={on_submit} className="button-white w-full">Iniciar sesión</button>
                        <button onClick={go_to_register} className="button-black w-full">No tengo cuenta</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage