import { query, request, Router } from "express";
import UserAgent from "user-agents";
import Scraper from "../utils/Scraper.js";
import {
  saveTrainData,
  saveTrainInfo,
  saveTrainSearchData,
} from "../utils/saveTrain.js";
import TrainTimetable from "../models/TrainTimetable.js";
import TrainSearch from "../models/TrainSearch.js";

// const prettify = new Prettify();
// const router = Router();

// router.get("/getTrain", async (req, res) => {
export const getTrainInfo = async (req, res) => {
  const { trainNo } = req.query;
  const URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
  try {
    const response = await fetch(URL_Train);
    const data = await response.text();
    let json = Scraper.getTrainInfo(data);

    const trainData = await TrainTimetable.findOne({ trainNo });
    if (!trainData) await saveTrainData(json);
    else json = trainData;
    res.json(json);
  } catch (e) {
    res.send(e.message);
  }
};

// router.get("/betweenStations", async (req, res) => {
export const getTrainsBetweenStations = async (req, res) => {
  const { from, to } = req.params;
  const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}
    &Station_To=${to}
    &DataSource=0&Language=0&Cache=true`;
  try {
    const userAgent = new UserAgent();
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() },
    });
    const data = await response.text();
    let json = Scraper.getTrainsBetweenStations(data);

    //this will be removed after I have enough data in the database
    await Promise.all(
      json.data.map(async (trainObj) => await saveTrainData(trainObj))
    );

    const trainSearchData = await TrainSearch.findOne({ from, to });
    if (!trainSearchData)
      await saveTrainSearchData({ from, to, data: json.data });
    else json = trainSearchData;

    res.json(json);
  } catch (error) {
    console.log(error);
  }
};

// router.get("/getTrainOn", async (req, res) => {
export const getTrainInfoByDate = async (req, res) => {
  const arr = [];
  const returnResponse = {};
  const { from, to, date } = req.params;
  if (!date) {
    returnResponse["success"] = false;
    returnResponse["timestamp"] = Date.now();
    returnResponse["data"] = "Please Add Specific Date";
    res.json(returnResponse);
    return;
  }
  const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}
  &Station_To=${to}
  &DataSource=0&Language=0&Cache=true`;
  try {
    const userAgent = new UserAgent();
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() },
    });
    const data = await response.text();
    const json = Scraper.getTrainsBetweenStations(data);
    if (!json["success"]) return res.json(json);
    const DD = date.split("-")[0];
    const MM = date.split("-")[1];
    const YYYY = date.split("-")[2];
    const day = getDayOnDate(DD, MM, YYYY);
    json["data"].forEach((ele, ind) => {
      if (ele["runningDays"][day] == 1) arr.push(ele);
    });
    returnResponse["success"] = true;
    returnResponse["timestamp"] = Date.now();
    returnResponse["data"] = arr;
    res.json(returnResponse);
  } catch (err) {
    console.log(err);
  }
};

// router.get("/getRoute", async (req, res) => {
export const getTrainRoute = async (req, res) => {
  const { trainNo } = req.params;
  try {
    let URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
    let response = await fetch(URL_Train);
    let data = await response.text();
    let json = Scraper.getTrainInfo(data);
    await saveTrainInfo(json);
    if (!json["success"]) return res.json(json);
    URL_Train = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${json["data"]["trainId"]}&Data2=0&Cache=true`;
    response = await fetch(URL_Train);
    data = await response.text();
    json = Scraper.getTrainRoute(data);
    await saveTrainInfo(json);
    res.send(json);
  } catch (err) {
    console.log(err.message);
  }
};

const getDayOnDate = (DD, MM, YYYY) => {
  let date = new Date(YYYY, MM, DD);
  let day =
    date.getDay() >= 0 && date.getDay() <= 2
      ? date.getDay() + 4
      : date.getDay() - 3;
  return day;
};
