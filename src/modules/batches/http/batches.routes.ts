import CreateBatchService from '../services/CreateBatchService';
import DeleteBatchService from '../services/DeleteBatchService';
import FindBatchByIdService from '../services/FindBatchByIdService';
import ListBatchesFromCompanyService from '../services/ListBatchesFromCompanyService';
import UpdateBatchService from '../services/UpdateBatchService';

import { Request, Response, Router } from 'express';
import { instanceToInstance } from 'class-transformer';

export const batchesRoutes = Router();

batchesRoutes.post('/', async (request: Request, response: Response) => {
    const { userId, name, creationDate, animal, race, city, state } =
        request.body;

    const createBatchService = new CreateBatchService();
    const createdBatch = await createBatchService.execute(userId, {
        name,
        creationDate,
        animal,
        race,
        city,
        state,
    });

    return response.status(201).json(instanceToInstance(createdBatch));
});

batchesRoutes.get(
    '/findById/:batchId',
    async (request: Request, response: Response) => {
        const { batchId } = request.params;

        const findBatchByIdService = new FindBatchByIdService();
        const findedBatch = await findBatchByIdService.execute(batchId);

        return response.status(200).json(instanceToInstance(findedBatch));
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

        return response.status(200).json(instanceToInstance(findedBatches));
    },
);

batchesRoutes.put('/:batchId', async (request: Request, response: Response) => {
    const { batchId } = request.params;
    const { name, animal, race, city, state, endingDate, userId } =
        request.body;

    const updateBatchService = new UpdateBatchService();
    const updatedBatch = await updateBatchService.execute(userId, {
        id: batchId,
        name,
        animal,
        race,
        city,
        state,
        endingDate,
    });

    return response.status(200).json(instanceToInstance(updatedBatch));
});

batchesRoutes.delete(
    '/:batchId',
    async (request: Request, response: Response) => {
        const { batchId } = request.params;
        const { userId } = request.body;

        const deleteBatchService = new DeleteBatchService();
        await deleteBatchService.execute(batchId, userId);

        return response.status(204).json();
    },
);
