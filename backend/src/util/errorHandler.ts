import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const { ValidationError } = require('joi');

const errorHandler = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<APIGatewayProxyResult | void> => {
    if (request.error instanceof ValidationError) {
      return (request.response = {
        statusCode: 400,
        body: JSON.stringify({ error: request.error }),
      });
    } else {
      return (request.response = {
        statusCode: 500,
        body: JSON.stringify({ error: request.error }),
      });
    }
  };
  return {
    onError,
  };
};

export default errorHandler;
