import { RequestHandler } from "express";
import {
  deleteBooking,
  getAllBookings,
  getBookingById,
} from "@services/parking-booking-service";

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
  res.status(201).json({
    success: true,
  });
};

export const putParkingBooking: RequestHandler = async (req, res) => {
  res.json({
    success: true,
  });
};

export const deleteParkingBooking: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const booking = await getBookingById(id);
  if (!booking) {
    res.status(404).send("Booking with the specified id was not found!");
  } else {
    await deleteBooking(id);
    res.status(200);
  }
};
