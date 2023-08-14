import mongoose from "mongoose";

const { Schema } = mongoose;

const trainTimetableSchema = new Schema(
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
    trainId: String,
    distanceFromTo: String,
    averageSpeed: String,
  },
  { collection: "timetable" },
  { timestamps: true }
);

const TrainTimetable = mongoose.model("timetable", trainTimetableSchema);

export default TrainTimetable;
