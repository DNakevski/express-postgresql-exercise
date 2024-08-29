import { getUserByToken } from "@services/user-service";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Verifies presence of the authorization token
 * @returns invalid status code or next()
 */
export function verifyUserAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        return res.sendStatus(StatusCodes.FORBIDDEN);
      }

      const token = extractToken(req.headers.authorization);
      const user = await getUserByToken(token);

      // in case user with the specified token is not found, return 401 status code
      if (!user) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
      req.currentUser = user;
      next();
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };
}

function extractToken(authHeader: string): string {
  // in case the auth header contains Bearer prefix, remove it
  return authHeader.replace("Bearer ", "");
}
