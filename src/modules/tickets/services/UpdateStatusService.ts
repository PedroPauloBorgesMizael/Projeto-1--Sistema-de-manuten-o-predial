import { prisma } from "@/shared/database/prisma";

interface IRequest {
  ticketId: string;
  status: "OPEN" | "IN_PROGRESS" | "DONE";
}

export class UpdateStatusService {
  async execute({ ticketId, status }: IRequest) {

    const ticketExists = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!ticketExists) {
      throw new Error("Ticket not found");
    }

    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status,
        completedAt: status === "DONE" ? new Date() : null,
      },
    });

    return ticket;
  }
}