import { prisma } from "@/shared/database/prisma";

interface IRequest {
  title: string;
  description: string;
  category: string;
  priority: string;
  location: string;
  requesterId: string;
}

export class CreateTicketService {
  async execute({
    title,
    description,
    category,
    priority,
    location,
    requesterId,
  }: IRequest) {

    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester) {
      throw new Error("Requester not found");
    }

    if (!requester.isActive) {
      throw new Error("Inactive user");
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        category,
        priority,
        location,
        requesterId,
      },
    });

    return ticket;
  }
}