import { companiesRoutes } from '@modules/companies/http/companies.routes';
import { userRoutes } from '@modules/users/http/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/company', companiesRoutes);

export default routes;
