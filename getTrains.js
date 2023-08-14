import { query, request, Router } from "express";
import UserAgent from "user-agents";
import Prettify from "../utils/prettify.js";

const prettify = new Prettify();
const router = Router();

router.get("/getTrain", async (req, res) => {
  const { trainNo } = req.query;
  const URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
  try {
    const response = await fetch(URL_Train);
    const data = await response.text();
    const json = prettify.CheckTrain(data);
    res.json(json);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/betweenStations", async (req, res) => {
  const { from, to } = req.query;
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
    const json = prettify.BetweenStation(data);
    res.json(json);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getTrainOn", async (req, res) => {
  const arr = [];
  const returnResponse = {};
  const { from, to, date } = req.query;
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
    const json = prettify.BetweenStation(data);
    if (!json["success"]) return res.json(json);
    const DD = date.split("-")[0];
    const MM = date.split("-")[1];
    const YYYY = date.split("-")[2];
    const day = prettify.getDayOnDate(DD, MM, YYYY);
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
});

router.get("/getRoute", async (req, res) => {
  const { trainNo } = req.query;
  try {
    let URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
    let response = await fetch(URL_Train);
    let data = await response.text();
    let json = prettify.CheckTrain(data);
    if (!json["success"]) return res.json(json);
    URL_Train = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${json["data"]["trainId"]}&Data2=0&Cache=true`;
    response = await fetch(URL_Train);
    data = await response.text();
    json = prettify.GetRoute(data);
    res.send(json);
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
