export type UserRole = "admin" | "user";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  token: string;
}
