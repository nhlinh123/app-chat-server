import {AnyZodObject, ZodError} from "zod";
import { Request, Response, NextFunction} from 'express';

export const validate =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                params: req.params,
                query: req.query,
                body: req.body
            });

            next();
        } catch (e: any) {
            if (e instanceof ZodError) {
                return res.status(400).json({
                    status: 'fail',
                    error: e.errors
                });
            }
            next(e);
        }
    };
