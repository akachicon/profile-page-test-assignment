export class HttpError extends Error {
  constructor(code, message) {
    super(message ?? 'Request failed due to server response');
    this.name = 'HttpError';
    this.statusCode = code;
  }
}

export class WrongResponseBodyError extends Error {
  constructor() {
    super('Request failed due to wrong response body');
    this.name = 'WrongResponseBodyError';
  }
}
