import { batchesRoutes } from '@modules/batches/http/batches.routes';
import { companiesRoutes } from '@modules/companies/http/companies.routes';
import { portionsRoutes } from '@modules/portions/http/portions.routes';
import { userRoutes } from '@modules/users/http/users.routes';
import { vaccinationsRoutes } from '@modules/vaccinations/http/vaccinations.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/company', companiesRoutes);
routes.use('/batch', batchesRoutes);
routes.use('/portion', portionsRoutes);
routes.use('/vaccination', vaccinationsRoutes);

export default routes;
