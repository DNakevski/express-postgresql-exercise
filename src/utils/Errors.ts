export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}

export class OperationNotAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationNotAuthorizedError";
  }
}
