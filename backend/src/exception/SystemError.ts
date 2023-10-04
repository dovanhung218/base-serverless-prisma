import { CommonError, CommonErrorParams } from "./CommonError";

export default class SystemError extends CommonError {
  readonly name: string;

  constructor(params: CommonErrorParams) {
    super({ statusCode: 500, ...params });
    this.name = "system error";
  }
}
