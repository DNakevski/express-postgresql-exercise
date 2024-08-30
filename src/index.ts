import "module-alias/register";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import adminRoutes from "@admin/admin-routes";
import userRoutes from "@standard-user/standard-user-routes";
import { handleErrorResponse } from "@middleware/error-handling-middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

// Error handling middleware
app.use(handleErrorResponse());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
