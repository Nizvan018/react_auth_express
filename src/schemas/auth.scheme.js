import { z } from 'zod';

/** Esquema para validad el registro de usuarios */
export const register_schema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email({
            message: 'Invalid email'
        }),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(6, {
            message: 'Password must be at least six characters'
        })
});

/** Esquema para validar el login de usuarios */
export const login_schema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email({
            message: 'Invalid email'
        }),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(6, {
            message: 'Password must be at lesat 6 characters'
        })
});