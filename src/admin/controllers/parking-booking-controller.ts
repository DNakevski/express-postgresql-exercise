import { RequestHandler } from "express";
import {
  deleteBooking,
  getAllBookings,
  getBookingById,
  createBooking,
  editBooking,
} from "@services/parking-booking-service";
import { z } from "zod";
import { addBookingSchema, putBookingSchema } from "@schemas/booking-schema";

export const getAllParkingBookings: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getAllBookings());
  } catch (error) {
    next(error);
  }
};

export const getParkingBooking: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    res.json(await getBookingById(id));
  } catch (error) {
    next(error);
  }
};

export const addParkingBooking: RequestHandler = async (req, res, next) => {
  try {
    const { startDateTime, endDateTime, parkingSpot } = req.body as z.infer<
      typeof addBookingSchema
    >;
    const newBooking = await createBooking({
      createdByUser: req.currentUser.id,
      parkingSpot,
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
    });

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

export const putParkingBooking: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const booking = await getBookingById(id);

    const putObject = req.body as z.infer<typeof putBookingSchema>;
    booking.startDateTime =
      putObject.startDateTime !== undefined
        ? new Date(putObject.startDateTime)
        : booking.startDateTime;
    booking.endDateTime =
      putObject.endDateTime !== undefined
        ? new Date(putObject.endDateTime)
        : booking.endDateTime;
    booking.parkingSpot =
      putObject.parkingSpot !== undefined
        ? putObject.parkingSpot
        : booking.parkingSpot;
    booking.updatedAt = new Date();

    await editBooking(booking);
    res.status(200).send("Booking successfully edited");
  } catch (error) {
    next(error);
  }
};

export const deleteParkingBooking: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await deleteBooking(id);
    res.status(200).send("Booking successfully deleted");
  } catch (error) {
    next(error);
  }
};
