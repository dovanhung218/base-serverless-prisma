import Lambda, { APIGatewayProxyResult } from 'aws-lambda';
import { processAPI } from './src/handler-helper';
import { MainController } from './src/MainController';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { createUserValidation } from './src/validation/user.validation';
export async function login(
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> {
  return processAPI(event, context, MainController.login);
}

export async function signup(
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> {
  return processAPI(event, context, MainController.signup);
}

export const createUser = middy(async function createUser(
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> {
  return processAPI(event, context, MainController.createUser);
})
  .use(validator({ eventSchema: transpileSchema(createUserValidation) }))
  .use(httpErrorHandler()).onError(()=>{
    
  })



export const getUser = async function getUser(
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context
): Promise<APIGatewayProxyResult | void> {
  return processAPI(event, context, MainController.getUser);
};
