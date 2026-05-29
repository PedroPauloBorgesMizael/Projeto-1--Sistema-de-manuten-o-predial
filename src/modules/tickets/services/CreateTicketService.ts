import { CreateTicketDTO } from "../dtos/CreateTicketDTO";
import { TicketRepository } from "../repositories/TicketRepository";

export class CreateTicketService {
  private repository = TicketRepository.getInstance();

  async execute({
    title,
    description,
    category,
    priority,
    location,
    requesterId,
  }: CreateTicketDTO) {

    const requester =
      await this.repository.findUserById(requesterId);

    if (!requester) {
      throw new Error("Requester not found");
    }

    if (!requester.isActive) {
      throw new Error("Inactive user");
    }

    const ticket =
      await this.repository.create({
        title,
        description,
        category,
        priority,
        location,
        requesterId,
      });

    return ticket;
  }
}