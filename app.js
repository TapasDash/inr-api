import express from "express";
import { config } from "dotenv";
// import home from "./routes/home.js";
// import gettrain from "./routes/getTrains.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import trainTimetableRouter from "./routes/trainTimetableRouter.js";

config();

const PORT = process.env.PORT || 3000;
const app = express();

// app.use("/", home);
app.use("/api", trainTimetableRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
