import express from "express";
import { notFound, errorHandler, auth } from "./middleware/index.js";
import dotenv from "dotenv";
import "express-async-errors";
import authRoute from "./routes/authRoutes.js";
import jobRoute from "./routes/jobRoutes.js";
import connectDB from "./db/connect.js";
import cors from "cors";
import morgan from "morgan";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5500;
connectDB();
//built-in middleaware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//Routes
app.get("/", (req, res) => {
  res.send("this is home route");
}); //Home Route
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});
app.use("/api/auth", authRoute);
app.use("/api/jobs", auth, jobRoute);
//custom middleware
app.use(notFound);
app.use(errorHandler);

app.get("*", notFound);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
