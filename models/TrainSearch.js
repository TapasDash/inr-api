import mongoose from "mongoose";
import { trainTimetableSchema } from "./TrainTimetable.js";

const { Schema } = mongoose;

const trainSearchSchema = new Schema(
  {
    from: String,
    to: String,
    trains: [trainTimetableSchema],
  },
  { collection: "trainSearch" },
  { timestamps: true }
);

const TrainSearch = mongoose.model("trainSearch", trainSearchSchema);

export default TrainSearch;
