import mongoose from "mongoose";

const { Schema } = mongoose;

export const trainInfoSchema = new Schema(
  {
    trainNo: String,
    trainName: String,
    sourceStationName: String,
    sourceStationCode: String,
    destinationStationName: String,
    destinationStationCode: String,
    fromStationName: String,
    fromStationCode: String,
    toStationName: String,
    toStationCode: String,
    fromTime: String,
    toTime: String,
    travelTime: String,
    runningDays: String,
    //spcl
    type: String,
    distanceFromTo: String,
    averageSpeed: String,
  },
  { collection: "trainInfo" },
  { timestamps: true }
);

const TrainInfo = mongoose.model("trainInfo", trainInfoSchema);

export default TrainInfo;
