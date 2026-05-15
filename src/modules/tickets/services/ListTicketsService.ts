import { prisma } from "@/shared/database/prisma";

export class ListTicketsService {
  async execute() {

    const tickets = await prisma.ticket.findMany({
      include: {
        requester: true,
        technician: true,
      },
    });

    return tickets;
  }
}