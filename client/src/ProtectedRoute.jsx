import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { loading, is_authenticated } = useAuth();
    console.log(loading, is_authenticated);

    if (loading) return <h1>Loading...</h1>
    if (!loading && !is_authenticated) return <Navigate to='/login' replace />

    return (
        <Outlet />
    )
}

export default ProtectedRoute