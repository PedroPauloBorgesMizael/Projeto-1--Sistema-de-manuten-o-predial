import { UserRepository } from "../repositories/UserRepository";

interface IRequest {
  userId: string;
}

export class ActivateUserService {
  private repository = UserRepository.getInstance();

  async execute({ userId }: IRequest) {

    const userExists =
      await this.repository.findById(userId);

    if (!userExists) {
      throw new Error("User not found");
    }

    const user =
      await this.repository.activate(userId);

    return user;
  }
}