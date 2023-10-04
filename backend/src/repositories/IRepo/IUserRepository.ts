import { User } from "@prisma/client";
import { CreateUserDto } from "../../dto/user/CreateUserDto";

export interface IUserRepository {
  create(user: CreateUserDto): Promise<User>;
  findFirst(user:User): Promise<User>;
}
