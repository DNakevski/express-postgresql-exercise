import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Ensures that the authenticated user has the Admin role
 * @returns invalid status code or next()
 */
export function ensureAdmin() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // sanity check
    if (!req.currentUser) {
      // we want error here
      throw new Error(
        "ensureAdmin middleware is called on non authenticated request. Make sure to initiate the authentication middleware first."
      );
    }

    if (req.currentUser.role !== "admin") {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    next();
  };
}
