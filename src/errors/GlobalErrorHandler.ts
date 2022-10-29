/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from './AppError';
import { NextFunction, Request, Response } from 'express';

function GlobalErrorHandler(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
): Response {
    const parsedError = {
        message: '',
        status: 500,
    };

    if (error instanceof AppError) {
        parsedError.message = error.message;
        parsedError.status = error.statusCode || 400;

        return response.status(parsedError.status).json({ error: parsedError });
    }

    console.log(error.message);
    parsedError.message = 'Internal Server Error.';
    return response.status(parsedError.status).json({ error: parsedError });
}

export default GlobalErrorHandler;
