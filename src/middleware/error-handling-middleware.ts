import { ActionNotAuthorizedError, ResourceNotFoundError } from "@utils/Errors";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/** Custom middleware for handling errors and returning proper responses depending on the error types */
export function handleErrorResponse() {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if (err instanceof ResourceNotFoundError) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    } else if (err instanceof ActionNotAuthorizedError) {
      res.status(StatusCodes.FORBIDDEN).send(err.message);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong");
    }
  };
}
