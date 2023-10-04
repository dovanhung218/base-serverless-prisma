import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from './IRepo/IUserRepository';
import { CreateUserDto } from '../dto/user/CreateUserDto';

export class UserRepository implements IUserRepository {
  prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  async create(user: CreateUserDto): Promise<User> {
    return await this.prismaClient.user.create({ data: user });
  }
  async findFirst(user:Partial<User>): Promise<User> {
    const data = await this.prismaClient.user.findFirst({ where: user });
    if (data) {
      return data;
    }
    throw new Error('Not found user.');
  }
}
