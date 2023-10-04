import middy from '@middy/core';
import Lambda, { APIGatewayProxyResult } from 'aws-lambda';
import { MainController } from './src/MainController';
import { processAPI } from './src/handler-helper';
import authorization from './src/util/authorization';
import errorHandler from './src/util/errorHandler';
import bodyValidator from './src/util/validator';
import { createUserValidation } from './src/validation/user.validation';
export async function login(
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> {
  return processAPI(event, context, MainController.login);
}

export const signup = async (
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> => {
  return processAPI(event, context, MainController.signup);
};

export const createUser = middy(
  async (
    event: Lambda.APIGatewayProxyEvent,
    context: Lambda.Context
  ): Promise<APIGatewayProxyResult | void> => {
    return processAPI(event, context, MainController.createUser);
  }
)
  .use(authorization())
  .use(bodyValidator(createUserValidation))
  .use(errorHandler());

export const getUser = async (
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> => {
  return processAPI(event, context, MainController.getUser);
};
