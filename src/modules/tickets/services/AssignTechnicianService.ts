import { prisma } from "@/shared/database/prisma";

interface IRequest {
  ticketId: string;
  technicianId: string;
}

export class AssignTechnicianService {
  async execute({
    ticketId,
    technicianId,
  }: IRequest) {

    const technician = await prisma.user.findUnique({
      where: {
        id: technicianId,
      },
    });

    if (!technician) {
      throw new Error("Technician not found");
    }

    if (technician.role !== "TECHNICIAN") {
      throw new Error("User is not a technician");
    }

    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        technicianId,
        status: "IN_PROGRESS",
      },
    });

    return ticket;
  }
}