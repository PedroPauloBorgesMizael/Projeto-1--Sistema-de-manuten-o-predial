import { prisma } from "@/shared/database/prisma";

import { CreateUserDTO } from "../dtos/CreateUserDTO";

export class UserRepository {
  private static INSTANCE: UserRepository;

  private constructor() { }

  static getInstance() {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE =
        new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async activate(userId: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: true,
      },
    });
  }

  async deactivate(userId: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });
  }

  async delete(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async findByIdWithRelations(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ticketsRequested: true,
        ticketsAssigned: true,
        comments: true,
      },
    });
  }
}