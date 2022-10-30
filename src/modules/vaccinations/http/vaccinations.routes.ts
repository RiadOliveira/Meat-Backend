import { Request, Response, Router } from 'express';
import CreateVaccinationService from '../services/CreateVaccinationService';
import DeleteVaccinationService from '../services/DeleteVaccinationService';
import UpdateVaccinationService from '../services/UpdateVaccinationService';

export const vaccinationsRoutes = Router();

vaccinationsRoutes.post('/', async (request: Request, response: Response) => {
    const { userId, name, vaccinationBatch, batchId } = request.body;

    const createVaccinationService = new CreateVaccinationService();
    const createdVaccination = await createVaccinationService.execute(userId, {
        name,
        vaccinationBatch,
        batchId,
    });

    return response.status(201).json(createdVaccination);
});

vaccinationsRoutes.put(
    '/:vaccinationId',
    async (request: Request, response: Response) => {
        const { vaccinationId } = request.params;
        const { name, vaccinationBatch, userId } = request.body;

        const updateVaccinationService = new UpdateVaccinationService();
        const updatedVaccination = await updateVaccinationService.execute(
            userId,
            {
                id: vaccinationId,
                name,
                vaccinationBatch,
            },
        );

        return response.status(200).json(updatedVaccination);
    },
);

vaccinationsRoutes.delete(
    '/:vaccinationId',
    async (request: Request, response: Response) => {
        const { vaccinationId } = request.params;
        const { userId } = request.body;

        const deleteVaccinationService = new DeleteVaccinationService();
        await deleteVaccinationService.execute(vaccinationId, userId);

        return response.status(204).json();
    },
);
