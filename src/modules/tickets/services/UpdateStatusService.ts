import { TicketRepository } from "../repositories/TicketRepository";
import { UpdateStatusDTO } from "../dtos/UpdateStatusDTO";

export class UpdateStatusService {
  private repository = TicketRepository.getInstance();

  async execute({
    ticketId,
    status,
  }: UpdateStatusDTO) {

    const ticketExists =
      await this.repository.findById(ticketId);

    if (!ticketExists) {
      throw new Error("Ticket not found");
    }

    const ticket =
      await this.repository.updateStatus({
        ticketId,
        status,
      });

    return ticket;
  }
} 