import { User } from "@schemas/user-schema";
import pool from "../db";

/**
 * Returns User for a given token
 * @param token
 * @returns User | null
 */
export async function getUserByToken(token: string): Promise<User | null> {
  try {
    const result = await pool.query(
      `SELECT * FROM "User" WHERE token LIKE $1`,
      [token]
    );

    if (!result.rowCount) {
      return null;
    }

    console.debug(`rows count ${result.rowCount}`);

    const userRow = result.rows[0];
    const user: User = {
      id: parseInt(userRow["id"]),
      firstName: userRow["first-name"],
      lastName: userRow["last-name"],
      email: userRow["email"],
      role: userRow["role"],
      token: userRow["token"],
    };

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
