import CreateBatchService from '../services/CreateBatchService';
import DeleteBatchService from '../services/DeleteBatchService';
import FindBatchByIdService from '../services/FindBatchByIdService';
import ListBatchesFromCompanyService from '../services/ListBatchesFromCompanyService';
import UpdateBatchService from '../services/UpdateBatchService';

import { Request, Response, Router } from 'express';

export const batchesRoutes = Router();

batchesRoutes.post('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;
    const { name, creationDate, animal, race, city, state } = request.body;

    const createBatchService = new CreateBatchService();
    const createBatch = await createBatchService.execute(userId, {
        name,
        creationDate,
        animal,
        race,
        city,
        state,
    });

    return response.json(createBatch);
});

batchesRoutes.get(
    '/findById/:batchId',
    async (request: Request, response: Response) => {
        const { batchId } = request.params;

        const findBatchByIdService = new FindBatchByIdService();
        const findedBatch = await findBatchByIdService.execute(batchId);

        return response.json(findedBatch);
    },
);

batchesRoutes.get(
    '/list-from-company/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;

        const listBatchesFromCompanyService =
            new ListBatchesFromCompanyService();
        const findedBatches = await listBatchesFromCompanyService.execute(
            companyId,
        );

        return response.json(findedBatches);
    },
);

batchesRoutes.put('/:userId', async (request: Request, response: Response) => {
    const { userId } = request.params;
    const { id, name, animal, race, city, state, endingDate } = request.body;

    const updateBatchService = new UpdateBatchService();
    const updatedBatch = await updateBatchService.execute(userId, {
        id,
        name,
        animal,
        race,
        city,
        state,
        endingDate,
    });

    return response.status(200).json(updatedBatch);
});

batchesRoutes.delete(
    '/:batchId',
    async (request: Request, response: Response) => {
        const { batchId } = request.params;

        const deleteBatchService = new DeleteBatchService();
        await deleteBatchService.execute(batchId);

        return response.status(204).json();
    },
);
