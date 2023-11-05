import mongoose from "mongoose";

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  dstCode: String,
  dstName: String,
  dstLat: String,
  dstLng: String,
  routeNo: String,
  distance: String,
  dayArrive: String,
  dayDepart: String,
  orgDepart: String,
  orgArrive: String,
  dstDepart: String,
  dstArrive: String,
  platform: String,
  delay: String,
  speed: String,
  platformAsString: String,
});

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
    schedules: [scheduleSchema],
  },
  { collection: "trainInfo" },
  { timestamps: true }
);

const TrainInfo = mongoose.model("trainInfo", trainInfoSchema);

export default TrainInfo;
