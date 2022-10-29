import { Request, Response, Router } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateSessionService from '../services/CreateSessionService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

export const userRoutes = Router();

userRoutes.post('/sessions', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute({
        email,
        password,
    });

    return response.json(instanceToInstance(user));
});

userRoutes.put('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;
    const { name, email, oldPassword, newPassword } = request.body;

    const updateUserService = new UpdateUserService();
    const updatedUser = await updateUserService.execute({
        name,
        email,
        oldPassword,
        newPassword,
        userId,
    });

    return response.status(202).json(instanceToInstance(updatedUser));
});

userRoutes.delete('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(userId);

    return response.status(204).json();
});
