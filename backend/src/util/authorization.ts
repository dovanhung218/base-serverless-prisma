import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { verify } from 'jsonwebtoken';

const authorization = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<APIGatewayProxyResult | void> => {
    const token = request.event.headers?.Authorization ?? '';
    const isValid = verify(token, `${process.env.APP_SECRET}`);
    if (!isValid) {
      throw new Error('Not authorize');
    }
  };
  return {
    before,
  };
};

export default authorization;
