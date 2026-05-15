import { prisma } from "@/shared/database/prisma";
import { hash } from "bcryptjs";
import { UserRole } from "../types/UserRoles";

export class CreateUserService {
  async execute({ name, email, password, role }: any) {

    if (!Object.values(UserRole).includes(role)) {
      throw new Error("Invalid role");
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
      },
    });

    return user;
  }
}