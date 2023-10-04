import { ControllerResponse } from '../handler-helper';
import { UserRepository } from '../repositories/UserRepository';
import { TokenResponse } from '../types';
import { LoginDto } from '../dto/user/LoginDto';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthService {
  static async login(loginDto: LoginDto): Promise<ControllerResponse<TokenResponse>> {
    const { email, password } = loginDto;
    const userRepo = new UserRepository();
    const user = await userRepo.findFirst({ email: email });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return {
      body: {
        accessToken: sign({ userId: user.id }, `${process.env.APP_SECRET}`, { expiresIn: 3000 }),
        refreshToken: sign({ userId: user.id }, `${process.env.APP_SECRET}`, { expiresIn: 10000 }),
      },
      headers: {},
    };
  }

  static async signup(loginDto: LoginDto): Promise<ControllerResponse<TokenResponse>> {
    const { email, password } = loginDto;
    const userRepo = new UserRepository();
    const user = await userRepo.findFirst({ email: email });
    if (!user) {
      throw new Error(`Email already in use: ${email}`);
    }
    const passwordHashed = await hash(password, 10);
    const data = await userRepo.create({ email, password: passwordHashed });
    return {
      body: {
        accessToken: sign({ userId: data.id }, `${process.env.APP_SECRET}`, { expiresIn: 3000 }),
        refreshToken: sign({ userId: data.id }, `${process.env.APP_SECRET}`, { expiresIn: 10000 }),
      },
      headers: {},
    };
  }
}
