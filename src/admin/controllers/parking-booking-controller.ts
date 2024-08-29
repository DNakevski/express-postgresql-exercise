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

export const getAllParkingBookings: RequestHandler = async (req, res) => {
  res.json(await getAllBookings());
};

export const getParkingBooking: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);

  const booking = await getBookingById(id);
  if (!booking) {
    res.status(404).send("Booking with the specified id was not found!");
  } else {
    res.json(booking);
  }
};

export const addParkingBooking: RequestHandler = async (req, res) => {
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
};

export const putParkingBooking: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const booking = await getBookingById(id);
  if (!booking) {
    res.status(404).send("Booking with the specified id was not found!");
  } else {
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
        ? parseInt(putObject.parkingSpot)
        : booking.parkingSpot;
    booking.updatedAt = new Date();

    await editBooking(booking);
    res.status(200).send("Booking successfully edited");
  }
};

export const deleteParkingBooking: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const booking = await getBookingById(id);
  if (!booking) {
    res.status(404).send("Booking with the specified id was not found!");
  } else {
    await deleteBooking(id);
    res.status(200).send("Booking successfully deleted");
  }
};
