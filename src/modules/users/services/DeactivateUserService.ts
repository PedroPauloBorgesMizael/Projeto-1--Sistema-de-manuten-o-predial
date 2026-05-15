import { prisma } from "@/shared/database/prisma";

interface IRequest {
  userId: string;
}

export class DeactivateUserService {
  async execute({ userId }: IRequest) {

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });

    return user;
  }
}