import { z } from "zod";
import {
  createBooking,
  deleteBooking,
  editBooking,
  getAllBookingsForUser,
  getBookingById,
} from "@services/parking-booking-service";
import { RequestHandler } from "express";
import { addBookingSchema, putBookingSchema } from "@schemas/booking-schema";
import { ActionNotAuthorizedError } from "@utils/Errors";

export const getAllParkingBookings: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getAllBookingsForUser(req.currentUser.id));
  } catch (error) {
    next(error);
  }
};

export const getParkingBooking: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const booking = await getBookingById(id);

    // verify that this is current user's booking
    if (booking?.createdByUser !== req.currentUser.id) {
      throw new ActionNotAuthorizedError("Action not authorized");
    }

    res.json(booking);
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

    // verify that this is current user's booking
    if (booking?.createdByUser !== req.currentUser.id) {
      throw new ActionNotAuthorizedError("Action not authorized");
    }

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
    const booking = await getBookingById(id);

    // verify that this is current user's booking
    if (booking?.createdByUser !== req.currentUser.id) {
      throw new ActionNotAuthorizedError("Action not authorized");
    }

    await deleteBooking(id);
    res.status(200).send("Booking successfully deleted");
  } catch (error) {
    next(error);
  }
};
