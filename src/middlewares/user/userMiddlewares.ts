import { NextFunction, Request, Response } from 'express';
import { ZodError, z, AnyZodObject } from 'zod';

export const createUserSchema = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    profilePic: z.string().optional()
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const validateSchema = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('req.body', req.body);
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: 'Validation error', errors: (error as any).errors });
            }
            next(error);
        }
    };
};

