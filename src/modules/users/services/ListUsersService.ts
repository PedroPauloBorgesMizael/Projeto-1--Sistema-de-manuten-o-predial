import { UserRepository } from "../repositories/UserRepository";

export class ListUsersService {
  private repository = UserRepository.getInstance();

  async execute() {
    const users = await this.repository.findAll();

    return users;
  }
}