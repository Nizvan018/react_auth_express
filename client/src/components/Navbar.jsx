import { Link } from "react-router-dom"
import { IoLogOut } from 'react-icons/io5';
import { FaReact } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="flex justify-between items-center px-8 py-6">
            <div className="w-full flex items-center">
                <FaReact className="mr-4 text-xl" />
                <Link to={'/tasks'} className="text-lg font-medium">React Auth</Link>
            </div>
            <li className="flex justify-center gap-8 w-full list-none">
                <ul>
                    <Link to={'/tasks'} className="font-medium text-sm text-gray-400 duration-300 hover:text-white">Tareas</Link>
                </ul>
                <ul>
                    <Link to={'/add-task'} className="font-medium text-sm text-gray-400 duration-300 hover:text-white">Agregar tarea</Link>
                </ul>
            </li>
            <div className="w-full flex justify-end">
                <Link to={'/login'} onClick={() => logout()} className="overflow-hidden group relative flex p-2 rounded-lg bg-white cursor-pointer duration-300 ease-in-out hover:pr-12">
                    <IoLogOut className="text-xl text-black" />
                    <span className="absolute left-5 ml-4 font-medium text-sm text-black transition-opacity duration-300 opacity-0 group-hover:opacity-100">Salir</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar