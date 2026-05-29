import { prisma } from "@/shared/database/prisma";

export class TicketRepository {
    private static INSTANCE: TicketRepository;

    private constructor() { }

    static getInstance() {
        if (!TicketRepository.INSTANCE) {
            TicketRepository.INSTANCE =
                new TicketRepository();
        }

        return TicketRepository.INSTANCE;
    }

    async findUserById(userId: string) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }

    async create(data: {
        title: string;
        description: string;
        category: string;
        priority: "LOW" | "MEDIUM" | "HIGH";
        location: string;
        requesterId: string;
    }) {
        return prisma.ticket.create({
            data,
        });
    }

    async findById(ticketId: string) {
        return prisma.ticket.findUnique({
            where: {
                id: ticketId,
            },
            include: {
                requester: true,
                technician: true,
                comments: true,
            },
        });
    }

    async assignTechnician({
        ticketId,
        technicianId,
    }: {
        ticketId: string;
        technicianId: string;
    }) {
        return prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: {
                technicianId,
                status: "IN_PROGRESS",
            },
        });
    }

    async findMany({
        userId,
        role,
    }: {
        userId: string;
        role: "ADMIN" | "TECHNICIAN" | "REQUESTER";
    }) {

        const where =
            role === "REQUESTER"
                ? {
                    requesterId: userId,
                }
                : {};

        return prisma.ticket.findMany({
            where,
            include: {
                requester: true,
                technician: true,
            },
        });
    }

    async updateStatus({
        ticketId,
        status,
    }: {
        ticketId: string;
        status: "NEW" | "IN_PROGRESS" | "PENDING" | "CLOSED";
    }) {

        return prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: {
                status,
                completedAt:
                    status === "CLOSED"
                        ? new Date()
                        : null,
            },
        });
    }
}