import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { ActivateUserService } from "../services/ActivateUserService";
import { DeactivateUserService } from "../services/DeactivateUserService";

export class UserController {

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Criar usuário
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               role:
     *                 type: string
     *                 example: REQUESTER
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     */

    async create(request: Request, response: Response) {
        const { name, email, password, role } = request.body;

        const service = new CreateUserService();

        const result = await service.execute({
            name,
            email,
            password,
            role,
        });

        return response.status(201).json(result);
    }

    /**
     * @swagger
     * /users/{id}/deactivate:
     *   patch:
     *     summary: Desativar usuário
     *     security:
     *       - bearerAuth: []
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuário desativado
     *       404:
     *         description: Usuário não encontrado
     */
    async deactivate(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeactivateUserService();

        const result = await service.execute({
            userId: id,
        });

        return response.json(result);
    }

    /**
     * @swagger
     * /users/{id}/activate:
     *   patch:
     *     summary: Ativar usuário
     *     security:
     *       - bearerAuth: []
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuário ativado
     *       404:
     *         description: Usuário não encontrado
     */
    async activate(request: Request, response: Response) {
        const { id } = request.params;

        const service = new ActivateUserService();

        const result = await service.execute({
            userId: id,
        });

        return response.json(result);
    }

    /**
    * @swagger
    * /users/{id}:
    *   delete:
    *     summary: Excluir usuário
    *     security:
    *       - bearerAuth: []
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: Usuário excluído
    *       404:
    *         description: Usuário não encontrado
    */
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteUserService();

        const result = await service.execute({
            userId: id,
        });

        return response.json(result);
    }
}