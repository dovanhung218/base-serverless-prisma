import { ControllerResponse } from '../handler-helper';
import { UserRepository } from '../repositories/UserRepository';
import { TypeResponse } from '../types';
import { CreateUserDto } from '../dto/user/CreateUserDto';
import { hash } from 'bcryptjs';

export class UserService {
  static async create(createUserDto: CreateUserDto): Promise<ControllerResponse<TypeResponse>> {
    const userRepo = new UserRepository();
    const passwordHashed = await hash(createUserDto.password, 10);
    const data = await userRepo.create({...createUserDto,password:passwordHashed});
    return {
      body: {
        result: data,
      },
      headers: {},
    };
  }

  static async get(id: number): Promise<ControllerResponse<TypeResponse>> {
    const userRepo = new UserRepository();
    const data = await userRepo.findFirst({ id });
    return {
      body: {
        result: data,
      },
      headers: {},
    };
  }
}
