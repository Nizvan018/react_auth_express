import { createContext, useState, useContext, useEffect } from "react";
import { register_req, login_req, verify_token_req } from '../api/auth'
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, set_user] = useState();
    const [is_authenticated, set_is_authenticated] = useState(false);
    const [errors, set_errors] = useState(null);
    const [loading, set_loading] = useState(true);
    const [loading_error, set_loading_error] = useState(true);

    const signup = async (user) => {
        try {
            set_errors(null);
            set_loading_error(true);
            const res = await register_req(user);

            set_user(res.data.data);
            set_is_authenticated(true);
            set_errors(null);

            return res;
        } catch (error) {
            set_errors(error.response.data);
            set_loading_error(false);
        }
    }

    const signin = async (user) => {
        try {
            set_errors(null);
            set_loading_error(true);
            const res = await login_req(user);
            set_is_authenticated(true);
            set_user(res.data.data);

            return res;
        } catch (error) {
            console.log(error);
            set_errors(error.response.data);
            set_loading_error(false);
        }
    }

    const logout = () => {
        Cookies.remove('token');
        set_is_authenticated(false);
        set_user(null);
    }

    useEffect(() => {
        async function check_login() {
            const cookies = Cookies.get();

            if (cookies.token) {
                try {
                    const res = await verify_token_req(cookies.token);
                    console.log(res);

                    if (!res.data) {
                        set_is_authenticated(false);
                        set_loading(false);
                        return;
                    }

                    set_is_authenticated(true);
                    set_user(res.data);
                    set_loading(false);
                } catch (error) {
                    set_is_authenticated(false);
                    set_user(null);
                    set_loading(false);
                }
            } else {
                set_is_authenticated(false);
                set_loading(false);
                return set_user(null);
            }
        }

        check_login();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signin, user, is_authenticated, errors, set_errors, loading, loading_error, set_loading_error, logout }}>
            {children}
        </AuthContext.Provider>
    )
}