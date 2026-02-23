import { z } from 'zod';

export const personalInfoSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

export const accountDetailsSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const preferencesSchema = z.object({
    newsletter: z.boolean().default(false),
    theme: z.enum(['light', 'dark', 'system'], {
        errorMap: () => ({ message: 'Please select a valid theme' }),
    }),
});
