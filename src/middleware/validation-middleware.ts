import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";
/**
 * Validates the request body depending depending on a match with a given zod schema
 * @param schema zod schema
 * @returns error or next()
 */
export function validateRequest(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error.issues);
        const errorMessages = error.issues.map(
          (issue) =>
            `${issue.path.join(".")} :: ${issue.code} - ${issue.message}`
        );
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid Request", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
