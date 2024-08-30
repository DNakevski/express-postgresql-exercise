import { Booking } from "@schemas/booking-schema";
import pool from "../db";

/**
 * Returns all bookings from database
 * @returns Booking[]
 */
export async function getAllBookings(): Promise<Booking[]> {
  const result = await pool.query(`SELECT * FROM "Booking"`);

  if (!result.rowCount) {
    return [];
  }

  return result.rows.map(dbRowToBooking);
}

/**
 * Returns booking by id
 * @param bookingId
 * @returns Booking
 */
export async function getBookingById(
  bookingId: number
): Promise<Booking | null> {
  const result = await pool.query(`SELECT * FROM "Booking" WHERE id = $1`, [
    bookingId,
  ]);

  if (!result.rowCount) {
    return null;
  }

  return dbRowToBooking(result.rows[0]);
}

/**
 * Returns all bookings from database
 * @returns Booking[]
 */
export async function getAllBookingsForUser(
  userId: number
): Promise<Booking[]> {
  const result = await pool.query(
    `SELECT * FROM "Booking" WHERE created_by_user = $1`,
    [userId]
  );

  if (!result.rowCount) {
    return [];
  }

  return result.rows.map(dbRowToBooking);
}

type CreateBookingType = Pick<
  Booking,
  "createdByUser" | "startDateTime" | "endDateTime" | "parkingSpot"
>;

/**
 * Creates new booking and returns it
 * @param booking: CreateBookingType
 * @returns Booking
 */
export async function createBooking(
  booking: CreateBookingType
): Promise<Booking> {
  const { createdByUser, startDateTime, endDateTime, parkingSpot } = booking;
  const result = await pool.query(
    `INSERT INTO "Booking" (created_by_user, start_date_time, end_date_time, parking_spot) VALUES ($1, $2, $3, $4) RETURNING *`,
    [createdByUser, startDateTime, endDateTime, parkingSpot]
  );

  return dbRowToBooking(result.rows[0]);
}

/**
 * Updates existing booking,
 * it assumes that booking object has been extracted previously from the database and updated accordingly
 * @param booking
 */
export async function editBooking(booking: Booking): Promise<void> {
  await pool.query(
    `UPDATE "Booking" SET created_by_user = $1, start_date_time = $2, end_date_time = $3, parking_spot = $4, updated_at = $5 WHERE id = $6`,
    [
      booking.createdByUser,
      booking.startDateTime,
      booking.endDateTime,
      booking.parkingSpot,
      booking.updatedAt,
      booking.id,
    ]
  );
}

/**
 * Deletes booking by its id
 * @param id: Id of the booking
 */
export async function deleteBooking(id: number): Promise<void> {
  await pool.query(`DELETE FROM "Booking" WHERE id = $1`, [id]);
}

/**
 * Converts database row into Booking object
 * @param row database row
 * @returns Booking object
 */
function dbRowToBooking(row: Record<string, string>): Booking {
  return {
    id: parseInt(row["id"]),
    createdByUser: parseInt(row["created_by_user"]),
    startDateTime: new Date(row["start_date_time"]),
    endDateTime: new Date(row["end_date_time"]),
    parkingSpot: parseInt(row["parking_spot"]),
    createdAt: new Date(row["created_at"]),
    updatedAt: new Date(row["updated_at"]),
  };
}
