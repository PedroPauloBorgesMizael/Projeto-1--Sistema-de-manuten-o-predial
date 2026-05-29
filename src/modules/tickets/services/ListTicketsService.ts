import { TicketRepository } from "../repositories/TicketRepository";

interface IRequest {
  userId: string;
  role: "ADMIN" | "TECHNICIAN" | "REQUESTER";
}

export class ListTicketsService {
  private repository = TicketRepository.getInstance();

  async execute({ userId, role }: IRequest) {

    const tickets =
      await this.repository.findMany({
        userId,
        role,
      });

    return tickets;
  }
}