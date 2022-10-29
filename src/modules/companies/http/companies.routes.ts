import { instanceToInstance } from 'class-transformer';
import { Request, Response, Router } from 'express';
import CreateCompanyService from '../services/CreateCompanyService';
import CreateEmployeeService from '../services/CreateEmployeeService';
import DeleteCompanyService from '../services/DeleteCompanyService';
import DeleteEmployeeService from '../services/DeleteEmployeeService';
import FindCompanyByIdService from '../services/FindCompanyByIdService';
import ListEmployeesFromCompanyService from '../services/ListEmployeesFromCompanyService';
import UpdateCompanyService from '../services/UpdateCompanyService';

export const companiesRoutes = Router();

companiesRoutes.post('', async (request: Request, response: Response) => {
    const { name, cnpj, city, state, producer } = request.body;

    const createCompanyService = new CreateCompanyService();
    const company = await createCompanyService.execute({
        name,
        cnpj,
        city,
        state,
        producer,
    });

    return response.json(company);
});

companiesRoutes.post(
    '/create-employee',
    async (request: Request, response: Response) => {
        const { name, email, password, accountType, producerId } = request.body;

        const createEmployeeService = new CreateEmployeeService();
        const employee = await createEmployeeService.execute(producerId, {
            name,
            email,
            password,
            accountType,
        });

        return response.json(instanceToInstance(employee));
    },
);

companiesRoutes.get(
    '/findById/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;

        const findCompanyByIdService = new FindCompanyByIdService();
        const findedEmployees = await findCompanyByIdService.execute(companyId);

        return response.json(findedEmployees);
    },
);

companiesRoutes.get(
    '/list-employees/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;

        const listEmployeesFromCompanyService =
            new ListEmployeesFromCompanyService();
        const findedEmployees = await listEmployeesFromCompanyService.execute(
            companyId,
        );

        return response.json(instanceToInstance(findedEmployees));
    },
);

companiesRoutes.put(
    '/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;
        const { name, city, state } = request.body;

        const updateCompanyService = new UpdateCompanyService();
        const updatedCompany = await updateCompanyService.execute(companyId, {
            name,
            city,
            state,
        });

        return response.status(202).json(updatedCompany);
    },
);

companiesRoutes.delete(
    '/delete-employee',
    async (request: Request, response: Response) => {
        const { employeeId, producerId } = request.body;

        const deleteEmployeeService = new DeleteEmployeeService();
        await deleteEmployeeService.execute(employeeId, producerId);

        return response.status(204).json();
    },
);

companiesRoutes.delete(
    '/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;

        const deleteCompanyService = new DeleteCompanyService();
        await deleteCompanyService.execute(companyId);

        return response.status(204).json();
    },
);
