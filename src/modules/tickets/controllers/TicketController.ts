import { Request, Response } from "express";

import { CreateTicketService } from "../services/CreateTicketService";
import { ListTicketsService } from "../services/ListTicketsService";
import { FindTicketByIdService } from "../services/FindTicketByIdService";
import { UpdateStatusService } from "../services/UpdateStatusService";
import { AssignTechnicianService } from "../services/AssignTechnicianService";

export class TicketController {

    /**
     * @swagger
     * /tickets:
     *   post:
     *     summary: Criar chamado
     *     security:
     *       - bearerAuth: []
     *     tags: [Tickets]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               category:
     *                 type: string
     *               priority:
     *                 type: string
     *               location:
     *                 type: string
     *     responses:
     *       201:
     *         description: Chamado criado com sucesso
     *       401:
     *         description: Não autenticado
     */
    async create(request: Request, response: Response) {

        const {
            title,
            description,
            category,
            priority,
            location,
        } = request.body;

        const service = new CreateTicketService();

        const result = await service.execute({
            title,
            description,
            category,
            priority,
            location,
            requesterId: request.user.id,
        });

        return response.status(201).json(result);
    }

    /**
     * @swagger
     * /tickets:
     *   get:
     *     summary: Listar chamados
     *     security:
     *       - bearerAuth: []
     *     tags: [Tickets]
     *     responses:
     *       200:
     *         description: Lista de chamados
     *       401:
     *         description: Não autenticado
     */
    async list(request: Request, response: Response) {

        const service = new ListTicketsService();

        const result = await service.execute();

        return response.json(result);
    }

    /**
     * @swagger
     * /tickets/{id}:
     *   get:
     *     summary: Buscar chamado por ID
     *     security:
     *       - bearerAuth: []
     *     tags: [Tickets]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Chamado encontrado
     *       404:
     *         description: Chamado não encontrado
     */
    async findById(request: Request, response: Response) {

        const { id } = request.params;

        const service = new FindTicketByIdService();

        const result = await service.execute({
            ticketId: id,
        });

        return response.json(result);
    }

    /**
     * @swagger
     * /tickets/{id}/status:
     *   patch:
     *     summary: Atualizar status do chamado
     *     security:
     *       - bearerAuth: []
     *     tags: [Tickets]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               status:
     *                 type: string
     *                 example: IN_PROGRESS
     *     responses:
     *       200:
     *         description: Status atualizado
     *       404:
     *         description: Chamado não encontrado
     */
    async updateStatus(request: Request, response: Response) {

        const { id } = request.params;
        const { status } = request.body;

        const service = new UpdateStatusService();

        const result = await service.execute({
            ticketId: id,
            status,
        });

        return response.json(result);
    }

    /**
     * @swagger
     * /tickets/{id}/assign:
     *   patch:
     *     summary: Atribuir técnico ao chamado
     *     security:
     *       - bearerAuth: []
     *     tags: [Tickets]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               technicianId:
     *                 type: string
     *     responses:
     *       200:
     *         description: Técnico atribuído
     *       404:
     *         description: Técnico não encontrado
     */
    async assignTechnician(
        request: Request,
        response: Response
    ) {

        const { id } = request.params;
        const { technicianId } = request.body;

        const service = new AssignTechnicianService();

        const result = await service.execute({
            ticketId: id,
            technicianId,
        });

        return response.json(result);
    }
}