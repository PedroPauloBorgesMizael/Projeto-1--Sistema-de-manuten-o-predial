import { prisma } from "@/shared/database/prisma";

interface IRequest {
  userId: string;
}

export class DeleteUserService {
  async execute({ userId }: IRequest) {

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ticketsRequested: true,
        ticketsAssigned: true,
        comments: true,
      },
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    if (
      userExists.ticketsRequested.length > 0 ||
      userExists.ticketsAssigned.length > 0 ||
      userExists.comments.length > 0
    ) {
      throw new Error(
        "User cannot be deleted because it has related records"
      );
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return {
      message: "User deleted successfully",
    };
  }
}