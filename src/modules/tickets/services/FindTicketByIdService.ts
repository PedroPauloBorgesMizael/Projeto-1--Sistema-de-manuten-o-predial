import { prisma } from "@/shared/database/prisma";

interface IRequest {
  ticketId: string;
}

export class FindTicketByIdService {
  async execute({ ticketId }: IRequest) {

    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        requester: true,
        technician: true,
        comments: true,
      },
    });

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    return ticket;
  }
}