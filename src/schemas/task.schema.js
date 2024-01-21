import { z } from 'zod';

export const create_task_schema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'Description must be a string'
    }),
    date: z
        .string()
        .datetime()
        .optional()
});