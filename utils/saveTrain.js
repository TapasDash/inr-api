import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable.js";
import TrainSearch from "../models/TrainSearch.js";
import TrainInfo from "../models/TrainInfo.js";

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

export const saveTrainSearchData = asyncHandler(async ({ from, to, data }) => {
  const trainSearchDataExists = await TrainSearch.exists({
    from,
    to,
  });
  if (!trainSearchDataExists)
    await TrainSearch.create({
      from,
      to,
      trains: data,
    });
});

// export const saveTrainInfo = asyncHandler(
//   async ({
//     dstCode,
//     dstName,
//     dstLat,
//     dstLng,
//     routeNo,
//     distance,
//     dayArrive,
//     dayDepart,
//     dstDepart,
//     dstArrive,
//     platform,
//     delay,
//     speed,
//     platformAsString,
//   }) => {
//     const ifTrainDataExists = await TrainInfo.exists({
//       trainNo,
//       fromStationCode,
//       toStationCode,
//     });
//     if (!ifTrainDataExists)
//       await TrainInfo.create({
//         dstCode,
//         dstName,
//         dstLat,
//         dstLng,
//         routeNo,
//         distance,
//         dayArrive,
//         dayDepart,
//         dstDepart,
//         dstArrive,
//         platform,
//         delay,
//         speed,
//         platformAsString,
//       });
//   }
// );
export const saveTrainInfo = asyncHandler(
  async (
    {
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
      //spcl
      type,
      distanceFromTo,
      averageSpeed,
    },
    schedules
  ) => {
    const ifTrainDataExists = await TrainInfo.exists({
      trainNo,
      fromStationCode,
      toStationCode,
    });
    console.log("schedules----->", ifTrainDataExists);
    if (!ifTrainDataExists)
      await TrainInfo.create({
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
        //spcl
        type,
        distanceFromTo,
        averageSpeed,
        schedules,
      });
  }
);
