import asyncHandler from "express-async-handler";
import redisClient from "../config/redisClient.js";
import TrainTimetable from "../models/TrainTimetable.js";
import redisKey from "../config/redisKeys.js";
import TrainDetails from "../models/TrainDetails.js";
import redisKeys from "../config/redisKeys.js";

export const getTrainData = asyncHandler(async (req, res) => {
  const { trainNo } = req.query;
  const cachedTrainData = await redisClient.get(
    `${redisKey.TRAIN_SCHEDULE}-${trainNo}`
  );
  if (cachedTrainData) {
    console.log("using cached data");
    return res.status(200).json({
      cached: true,
      success: true,
      data: JSON.parse(cachedTrainData),
    });
  }
  const trainData = await TrainTimetable.find({ trainNo }).sort("seq").lean();
  await redisClient.set(
    `${redisKey.TRAIN_SCHEDULE}-${trainNo}`,
    JSON.stringify(trainData)
  );

  return res.status(200).json({
    success: true,
    data: trainData,
  });
});

export const getTrainsBetweenStations = asyncHandler(async (req, res) => {
  const { fromStation, toStation } = req.params;
  const cachedTrainBtwData = await redisClient.get(
    `${redisKey.TRAINS_BETWEEN_STATIONS}-${fromStation}-${toStation}`
  );
  if (cachedTrainBtwData) {
    console.log("using cached data");
    return res.status(200).json({
      cached: true,
      success: true,
      data: JSON.parse(cachedTrainBtwData),
    });
  }

  const [fromStationData, toStationData] = await Promise.all([
    await TrainTimetable.find({
      stationCode: fromStation,
    }).lean(),
    await TrainTimetable.find({
      stationCode: toStation,
    }).lean(),
  ]);

  const trainBtw = [];

  fromStationData.map((fromStation) => {
    // console.log({ trainNo, sourceStation, destinationStation, seq });
    const toStationDataFiltered = toStationData.find((toStation) => {
      // console.log({ toStation });
      return (
        fromStation.trainNo === toStation.trainNo &&
        fromStation.sourceStation === toStation.sourceStation &&
        fromStation.destinationStation === toStation.destinationStation &&
        fromStation.seq < toStation.seq
      );
    });
    toStationDataFiltered &&
      trainBtw.push({ src: fromStation, dest: toStationDataFiltered });
  });
  await redisClient.set(
    `${redisKey.TRAINS_BETWEEN_STATIONS}-${fromStation}-${toStation}`,
    JSON.stringify(trainBtw)
  );
  return res.status(200).json({
    success: true,
    data: trainBtw,
  });
});

export const getTrainInfoDropown = asyncHandler(async (req, res) => {
  const cachedTrainInfo = await redisClient.get(redisKeys.TRAIN_INFO);
  if (cachedTrainInfo) {
    console.log("using cached data");
    return res.status(200).json({
      cached: true,
      success: true,
      data: JSON.parse(cachedTrainInfo),
    });
  }

  const trainData = await TrainDetails.aggregate()
    .group({
      _id: "$trainNo",
      trainName: {
        $addToSet: "$trainName",
      },
    })
    .project({
      trainName: { $arrayElemAt: ["$trainName", 0] },
    });

  await redisClient.set(redisKey.TRAIN_INFO, JSON.stringify(trainData));

  return res.status(200).json({
    success: true,
    data: trainData,
  });
});
