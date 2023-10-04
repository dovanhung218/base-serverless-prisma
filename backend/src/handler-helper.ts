import Lambda, { APIGatewayProxyResult } from 'aws-lambda';
import { CustomLogger } from './util/CustomLogger';
import { CommonError } from './exception/CommonError';
import SystemError from './exception/SystemError';

const logger = CustomLogger.getCustomLogger();

const DEFAULT_API_RESPONSE_HEADERS = {
  'Content-Type': 'application/json',
  // "Access-Control-Allow-Origin": process.env.FRONTEND_URL || "",
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

function createSuccessResponse<T>(
  body: T,
  headers?: Record<string, string>
): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: headers
      ? {
          ...headers,
          ...DEFAULT_API_RESPONSE_HEADERS,
        }
      : DEFAULT_API_RESPONSE_HEADERS,
  };
}

function createErrorResponse(error: CommonError): APIGatewayProxyResult {
  return {
    statusCode: error.statusCode,
    body: JSON.stringify({
      code: error.code,
      message: error.message,
    }),
    headers: DEFAULT_API_RESPONSE_HEADERS,
  };
}

function wrapError(e: any): CommonError {
  return e instanceof CommonError
    ? e
    : new SystemError({
        code: '500',
        message: 'unexpected error occurred',
        cause: e,
      });
}

export interface ControllerResponse<T> {
  body: T;
  headers?: Record<string, string>;
}

export async function processAPI<T>(
  event: Lambda.APIGatewayProxyEvent,
  context: Lambda.Context,
  controllerMethod: (event: Lambda.APIGatewayProxyEvent) => Promise<ControllerResponse<T>>
): Promise<APIGatewayProxyResult> {
  logger.debug('request context: ', context);
  logger.debug('request event: ', event);
  try {
    const { body, headers } = await controllerMethod(event);
    return createSuccessResponse(body, headers);
  } catch (e) {
    const commonError = wrapError(e);
    return createErrorResponse(commonError);
  } finally {
  }
}

export function parseBody<T>(event: Lambda.APIGatewayProxyEvent): T {
  return event.body ? JSON.parse(event.body) : {};
}
