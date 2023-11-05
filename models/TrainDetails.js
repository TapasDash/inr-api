import mongoose from "mongoose";

const { Schema } = mongoose;

export const trainDetails = new Schema(
  {
    departureTime: String,
    destinationStation: String,
    destinationStationName: String,
    distance: String,
    seq: String,
    sourceStation: String,
    sourceStationName: String,
    stationCode: String,
    stationName: String,
    trainName: String,
    trainNo: String,
    arrivalTime: String,
  },
  { collection: "trainDetails" },
  { timestamps: true }
);

const TrainDetails = mongoose.model("trainDetails", trainDetails);

export default TrainDetails;
