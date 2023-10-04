import Lambda from 'aws-lambda';
import { UserService } from './services/UserService';
import { ControllerResponse } from './handler-helper';
import { TokenResponse, TypeResponse } from './types';
import { CreateUserDto } from './dto/user/CreateUserDto';
import { AuthService } from './services/AuthService';
import { LoginDto } from './dto/user/LoginDto';

export class MainController {
  
  static async login(
    event: Lambda.APIGatewayProxyEvent
  ): Promise<ControllerResponse<TokenResponse>> {
    const body = event.body ?? 'No Body';
    console.log(body);
    console.log('🚀 ~ file: MainController.ts:14 ~ MainController ~ body:', body);

    return AuthService.login(JSON.parse(body) as LoginDto);
  }
  static async signup(
    event: Lambda.APIGatewayProxyEvent
  ): Promise<ControllerResponse<TokenResponse>> {
    const body = event.body ?? 'No Body';
    console.log(body);
    console.log('🚀 ~ file: MainController.ts:14 ~ MainController ~ body:', body);

    return AuthService.signup(JSON.parse(body) as LoginDto);
  }

  static async createUser(
    event: Lambda.APIGatewayProxyEvent
  ): Promise<ControllerResponse<TypeResponse>> {
    const body = event.body ?? 'No Body';
    return UserService.create(JSON.parse(body) as CreateUserDto);
  }

  static async getUser(
    event: Lambda.APIGatewayProxyEvent
  ): Promise<ControllerResponse<TypeResponse>> {
    console.log("callllllll");
    
    const id = event.queryStringParameters?.id ? parseInt(event.queryStringParameters?.id) : -1;
    return UserService.get(id);
  }
}
