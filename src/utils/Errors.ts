export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}

export class ActionNotAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationNotAuthorizedError";
  }
}
