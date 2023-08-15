import express from "express";
import {
  getTrainInfo,
  getTrainInfoByDate,
  getTrainRoute,
  getTrainsBetweenStations,
} from "../controllers/getTrains.js";
// import {
//   getTrainData,
//   getTrainInfo,
//   getTrainsBetweenStations,
// } from "../controllers/trainController.js";

const trainTimetableRouter = express.Router();

trainTimetableRouter.route("/train").get(getTrainInfo);
trainTimetableRouter.route("/train/:trainNo").get(getTrainRoute);
trainTimetableRouter.route("/train/:from/:to").get(getTrainsBetweenStations);
trainTimetableRouter.route("/train/:from/:to/:date").get(getTrainInfoByDate);

// trainTimetableRouter.route("/train/info").get(getTrainInfo);
export default trainTimetableRouter;
