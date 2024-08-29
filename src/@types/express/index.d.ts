import { User } from "@schemas/user-schema";

/**
 * Used for extending the express Request type with additional properties
 * This properties are used to hold additional data during the request lifecycle
 * Example: currentUser holds the authenticated user object
 */
declare global {
  namespace Express {
    interface Request {
      currentUser: User;
      /*
          other variables (if needed)
        */
    }
  }
}
