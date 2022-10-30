import { Request, Response, Router } from 'express';
import CreatePortionService from '../services/CreatePortionService';
import DeletePortionService from '../services/DeletePortionService';
import UpdatePortionService from '../services/UpdatePortionService';

export const portionsRoutes = Router();

portionsRoutes.post('/', async (request: Request, response: Response) => {
    const { userId, name, portionBatch, batchId } = request.body;

    const createPortionService = new CreatePortionService();
    const createdPortion = await createPortionService.execute(userId, {
        name,
        portionBatch,
        batchId,
    });

    return response.json(createdPortion);
});

portionsRoutes.put(
    '/:portionId',
    async (request: Request, response: Response) => {
        const { portionId } = request.params;
        const { name, portionBatch, userId } = request.body;

        const updatePortionService = new UpdatePortionService();
        const updatedPortion = await updatePortionService.execute(userId, {
            id: portionId,
            name,
            portionBatch,
        });

        return response.status(200).json(updatedPortion);
    },
);

portionsRoutes.delete(
    '/:portionId',
    async (request: Request, response: Response) => {
        const { portionId } = request.params;
        const { userId } = request.body;

        const deletePortionService = new DeletePortionService();
        await deletePortionService.execute(portionId, userId);

        return response.status(204).json();
    },
);
