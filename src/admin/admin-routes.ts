import { NextFunction, Router, Request, Response } from "express";
import {
  addParkingBooking,
  deleteParkingBooking,
  getAllParkingBookings,
  getParkingBooking,
  putParkingBooking,
} from "./controllers/parking-booking-controller";
import { validateRequest } from "@middleware/validation-middleware";
import { addBookingSchema, putBookingSchema } from "@schemas/booking-schema";
import { verifyUserAuth } from "@middleware/auth-middleware";
import { ensureAdmin } from "@middleware/ensure-admin-middleware";

const router = Router();

/**
 * General ADMIN request log middleware
 */
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Admin route called: ${req.method} - ${
      req.originalUrl
    } at ${new Date().toISOString()}`
  );

  next();
});

// Add the authentication and admin permissions middlewares
router.use(verifyUserAuth(), ensureAdmin());

// base route for parking bookings
const PARKING_BOOKINGS_BASE_ROUTE = "/parking-bookings/";

router.get(PARKING_BOOKINGS_BASE_ROUTE, getAllParkingBookings);

router.get(`${PARKING_BOOKINGS_BASE_ROUTE}:id`, getParkingBooking);

router.post(
  PARKING_BOOKINGS_BASE_ROUTE,
  validateRequest(addBookingSchema),
  addParkingBooking
);

router.put(
  `${PARKING_BOOKINGS_BASE_ROUTE}:id`,
  validateRequest(putBookingSchema),
  putParkingBooking
);

router.delete(`${PARKING_BOOKINGS_BASE_ROUTE}:id`, deleteParkingBooking);

export default router;
