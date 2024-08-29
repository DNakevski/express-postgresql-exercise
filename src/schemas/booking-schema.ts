import { z } from "zod";

// represents the general structure of a booking
export interface Booking {
  id: number;
  createdByUser: number;
  startDateTime: Date;
  endDateTime: Date;
  parkingSpot: number;
  createdAt: Date;
  updatedAt: Date;
}

// zod schema for validating the schema when new booking is created
// z.string().datetime() expects ISO datetime string in the format of "2024-08-28T10:00:00.037Z"
export const addBookingSchema = z.object({
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  parkingSpot: z.string(),
});

// zod schema for validating the schema when booking is being updated
// this can easily inherit the addBookingSchema but I am keeping them separate
// in case it needs to be modified in the future
// z.string().datetime() expects ISO datetime string in the format of "2024-08-28T10:00:00.037Z"
export const putBookingSchema = z.object({
  startDateTime: z.string().datetime().optional(),
  endDateTime: z.string().datetime().optional(),
  parkingSpot: z.string().optional(),
});
