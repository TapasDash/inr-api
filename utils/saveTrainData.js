import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable";

export const saveTrainData = asyncHandler(
  async ({
    trainNo,
    trainName,
    sourceStationName,
    sourceStationCode,
    destinationStationName,
    destinationStationCode,
    fromStationName,
    fromStationCode,
    toStationName,
    toStationCode,
    fromTime,
    toTime,
    travelTime,
    runningDays,
  }) => {
    const ifTrainDataExists = await TrainTimetable.exists({
      trainNo,
      fromStationCode,
      toStationCode,
    });
    if (!ifTrainDataExists)
      await TrainTimetable.create({
        trainNo,
        trainName,
        sourceStationName,
        sourceStationCode,
        destinationStationName,
        destinationStationCode,
        fromStationName,
        fromStationCode,
        toStationName,
        toStationCode,
        fromTime,
        toTime,
        travelTime,
        runningDays,
      });
  }
);
