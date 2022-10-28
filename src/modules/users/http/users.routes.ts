import { Request, Response, Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

export const userRoutes = Router();

userRoutes.post('/sign-up', async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const createdUser = await CreateUserService.execute({
        name,
        email,
        password,
    });

    createdUser.password = '';
    return response.status(201).json(createdUser);
});

userRoutes.post('/sessions', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await CreateSessionService.execute({
        email,
        password,
    });

    user.password = '';
    return response.json(user);
});

userRoutes.put('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;
    const { name, email, oldPassword, newPassword } = request.body;

    const updatedUser = await UpdateUserService.execute({
        name,
        email,
        oldPassword,
        newPassword,
        userId,
    });

    updatedUser.password = '';
    return response.status(202).json(updatedUser);
});

userRoutes.delete('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;

    await DeleteUserService.execute(userId);
    return response.status(204).json();
});
