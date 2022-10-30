import { instanceToInstance } from 'class-transformer';
import { Request, Response, Router } from 'express';
import CreateSlaughterService from '../services/CreateSlaughterService';
import DeleteSlaughterService from '../services/DeleteSlaughterService';
import UpdateSlaughterService from '../services/UpdateSlaughterService';

export const slaughterRoutes = Router();

slaughterRoutes.post('/', async (request: Request, response: Response) => {
    const { userId, method, description, slaughterDate, batchId } =
        request.body;

    const createSlaughterService = new CreateSlaughterService();
    const createdSlaughter = await createSlaughterService.execute(userId, {
        method,
        description,
        slaughterDate,
        batchId,
    });

    return response.status(201).json(instanceToInstance(createdSlaughter));
});

slaughterRoutes.put(
    '/:slaughterId',
    async (request: Request, response: Response) => {
        const { slaughterId } = request.params;
        const { userId, method, description, slaughterDate } = request.body;

        const updateSlaughterService = new UpdateSlaughterService();
        const updatedSlaughter = await updateSlaughterService.execute(userId, {
            id: slaughterId,
            method,
            description,
            slaughterDate,
        });

        return response.status(200).json(instanceToInstance(updatedSlaughter));
    },
);

slaughterRoutes.delete(
    '/:slaughterId',
    async (request: Request, response: Response) => {
        const { slaughterId } = request.params;
        const { userId } = request.body;

        const deleteSlaughterService = new DeleteSlaughterService();
        await deleteSlaughterService.execute(slaughterId, userId);

        return response.status(204).json();
    },
);
