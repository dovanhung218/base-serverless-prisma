type ErrorCode = "500" | "";

export type CommonErrorParams = {
  code?: ErrorCode;
  message: string;
  detail?: string;
  cause?: Error;
};

export abstract class CommonError extends Error {
  readonly statusCode: number;
  readonly code: ErrorCode;
  readonly message: string;
  readonly detail?: string; // log only
  readonly cause?: Error;
  protected constructor(
    params: CommonErrorParams & {
      statusCode: number;
    }
  ) {
    const { code, message, detail, cause, statusCode } = params;

    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code ?? "";
    this.message = message;
    this.detail = detail;
    this.cause = cause;
  }

  get params(): CommonErrorParams {
    return {
      code: this.code,
      message: this.message,
      detail: this.detail,
      cause: this.cause,
    };
  }
}
