import { Request, Response, Router } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateSessionService from '../services/CreateSessionService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';
import FindUserByIdService from '../services/FindUserByIdService';

export const userRoutes = Router();

userRoutes.post('/sessions', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute({
        email,
        password,
    });

    return response.status(201).json(instanceToInstance(user));
});

userRoutes.get('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;

    const findUserByIdService = new FindUserByIdService();
    const findedUser = await findUserByIdService.execute(userId);

    return response.status(200).json(instanceToInstance(findedUser));
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

    return response.status(200).json(instanceToInstance(updatedUser));
});

userRoutes.delete('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(userId);

    return response.status(204).json();
});
