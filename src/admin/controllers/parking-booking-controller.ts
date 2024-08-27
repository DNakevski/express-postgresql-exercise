import { RequestHandler } from "express";

export const getAllParkingBookings: RequestHandler = async (req, res) => {
  res.json({
    success: true,
  });
};

export const getParkingBooking: RequestHandler = async (req, res) => {
  res.json({
    success: true,
  });
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
  res.json({
    success: true,
  });
};
