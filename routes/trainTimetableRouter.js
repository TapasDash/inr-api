import express from "express";
import {
  getPnrStatus,
  getTrainInfo,
  getTrainInfoByDate,
  getTrainRoute,
  getTrainsBetweenStations,
} from "../controllers/getTrains.js";
// import { getTrainInfoDropown } from "../controllers/trainController.js";
// import {
//   getTrainData,
//   getTrainInfo,
//   getTrainsBetweenStations,
// } from "../controllers/trainController.js";

const trainTimetableRouter = express.Router();

// trainTimetableRouter.route("/train").get(getTrainInfo);
// trainTimetableRouter.route("/train/dropdown").get(getTrainInfoDropown);
// trainTimetableRouter.route("/train/:trainNo").get(getTrainRoute);
trainTimetableRouter.route("/train/pnr/:pnrNo").get(getPnrStatus);
// trainTimetableRouter.route("/train/:from/:to").get(getTrainsBetweenStations);
// trainTimetableRouter.route("/train/:from/:to/:date").get(getTrainInfoByDate);

// trainTimetableRouter.route("/train/info").get(getTrainInfo);
export default trainTimetableRouter;
