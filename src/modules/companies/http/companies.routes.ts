import { instanceToInstance } from 'class-transformer';
import { Request, Response, Router } from 'express';
import CreateCompanyService from '../services/CreateCompanyService';
import CreateMemberService from '../services/CreateMemberService';
import DeleteCompanyService from '../services/DeleteCompanyService';
import DeleteMemberService from '../services/DeleteMemberService';
import FindCompanyByIdService from '../services/FindCompanyByIdService';
import ListMembersFromCompanyService from '../services/ListMembersFromCompanyService';
import UpdateCompanyService from '../services/UpdateCompanyService';
import UpdateMemberService from '../services/UpdateMemberService';

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

    return response.status(201).json(company);
});

companiesRoutes.post(
    '/create-member',
    async (request: Request, response: Response) => {
        const { name, email, password, accountType, producerId } = request.body;

        const createMemberService = new CreateMemberService();
        const Member = await createMemberService.execute(producerId, {
            name,
            email,
            password,
            accountType,
        });

        return response.status(201).json(instanceToInstance(Member));
    },
);

companiesRoutes.get(
    '/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;

        const findCompanyByIdService = new FindCompanyByIdService();
        const findedCompany = await findCompanyByIdService.execute(companyId);

        return response.status(200).json(findedCompany);
    },
);

companiesRoutes.get(
    '/list-members/:companyId',
    async (request: Request, response: Response) => {
        const { companyId } = request.params;

        const listMembersFromCompanyService =
            new ListMembersFromCompanyService();
        const findedMembers = await listMembersFromCompanyService.execute(
            companyId,
        );

        return response.status(200).json(instanceToInstance(findedMembers));
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

        return response.status(200).json(updatedCompany);
    },
);

companiesRoutes.put(
    '/update-member/:memberId',
    async (request: Request, response: Response) => {
        const { memberId } = request.params;
        const { producerId, name, email, password, accountType } = request.body;

        const updateMemberService = new UpdateMemberService();
        const updatedMember = await updateMemberService.execute(producerId, {
            memberId,
            name,
            email,
            accountType,
            password,
        });

        return response.status(200).json(instanceToInstance(updatedMember));
    },
);

companiesRoutes.delete(
    '/delete-member/:MemberId',
    async (request: Request, response: Response) => {
        const { MemberId } = request.params;
        const { producerId } = request.body;

        const deleteMemberService = new DeleteMemberService();
        await deleteMemberService.execute(MemberId, producerId);

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
