import express from "express";
import {
  getTrainData,
  getTrainInfo,
  getTrainsBetweenStations,
} from "../controllers/trainController.js";

const trainTimetableRouter = express.Router();

trainTimetableRouter.route("/train").get(getTrainData);
trainTimetableRouter
  .route("/train/:fromStation/:toStation")
  .get(getTrainsBetweenStations);
trainTimetableRouter.route("/train/info").get(getTrainInfo);
export default trainTimetableRouter;
