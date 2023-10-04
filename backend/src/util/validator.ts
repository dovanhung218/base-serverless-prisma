import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Joi from 'joi';

const bodyValidator = (
  schema: Joi.ObjectSchema
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<APIGatewayProxyResult | void> => {
    const { body } = request.event;
    if (!body) {
      throw new Error('Empty request body!');
    }
    const data = JSON.parse(body);
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      throw error;
    }
  };

  return {
    before,
  };
};

export default bodyValidator;
