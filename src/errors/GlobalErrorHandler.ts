/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from './AppError';
import { NextFunction, Request, Response } from 'express';

function GlobalErrorHandler(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
): Response {
    const error = {
        error: { message: err.message, status: 'error' },
    };

    if (err instanceof AppError) {
        const status = err.statusCode || 400;
        return response.status(status).json(error);
    }

    error.error.message = 'Internal Server Error.';
    return response.status(500).json(error);
}

export default GlobalErrorHandler;
