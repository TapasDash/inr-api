class Scraper {
  static getTrainsBetweenStations(string) {
    try {
      let obj = {};
      const returnResponse = {};
      const arr = [];
      let obj2 = {};
      let data = string.split("~~~~~~~~");
      let noResponse = data[0].split("~");
      noResponse = noResponse[5].split("<");
      if (noResponse[0] == "No direct trains found") {
        returnResponse["success"] = false;
        returnResponse["timestamp"] = Date.now();
        returnResponse["data"] = noResponse[0];
        return returnResponse;
      }
      if (
        data[0] === "~~~~~Please try again after some time." ||
        data[0] === "~~~~~From station not found" ||
        data[0] === "~~~~~To station not found"
      ) {
        returnResponse["success"] = false;
        returnResponse["timestamp"] = Date.now();
        returnResponse["data"] = data[0].replaceAll("~", "");
        return returnResponse;
      }
      data = data.filter(Boolean);
      for (let i = 0; i < data.length; i++) {
        let filteredData = data[i].split("~^");
        if (filteredData.length === 2) {
          filteredData = filteredData[1].split("~");
          filteredData = filteredData.filter(Boolean);
          obj["trainNo"] = filteredData[0];
          obj["trainName"] = filteredData[1];
          obj["sourceStationName"] = filteredData[2];
          obj["sourceStationCode"] = filteredData[3];
          obj["destinationStationName"] = filteredData[4];
          obj["destinationStationCode"] = filteredData[5];
          obj["fromStationName"] = filteredData[6];
          obj["fromStationCode"] = filteredData[7];
          obj["toStationName"] = filteredData[8];
          obj["toStationCode"] = filteredData[9];
          obj["fromTime"] = filteredData[10];
          obj["toTime"] = filteredData[11];
          obj["travelTime"] = filteredData[12];
          obj["runningDays"] = filteredData[13];
          // obj2["trainBase"] = obj;
          arr.push(obj);
          obj = {};
          obj2 = {};
        }
      }
      returnResponse["success"] = true;
      returnResponse["timestamp"] = Date.now();
      returnResponse["data"] = arr;
      return returnResponse;
    } catch (err) {
      console.warn(err.message);
    }
  }

  // export const getDayOnDate(DD, MM, YYYY) => {
  //   let date = new Date(YYYY, MM, DD);
  //   let day =
  //     date.getDay() >= 0 && date.getDay() <= 2
  //       ? date.getDay() + 4
  //       : date.getDay() - 3;
  //   return day;
  // };

  static getTrainRoute(string) {
    try {
      const data = string.split("~^");
      const arr = [];
      let obj = {};
      const returnResponse = {};
      for (let i = 0; i < data.length; i++) {
        let filteredData = data[i].split("~");
        filteredData = filteredData.filter(Boolean);
        obj["sourceStationName"] = filteredData[2];
        obj["sourceStationCode"] = filteredData[1];
        obj["arrival"] = filteredData[3];
        obj["departure"] = filteredData[4];
        obj["distance"] = filteredData[6];
        obj["day"] = filteredData[7];
        obj["zone"] = filteredData[9];
        arr.push(obj);
        obj = {};
      }
      returnResponse["success"] = true;
      returnResponse["timestamp"] = Date.now();
      returnResponse["data"] = arr;
      return returnResponse;
    } catch (err) {
      console.log(err.message);
    }
  }

  static getTrainInfo(string) {
    try {
      const obj = {};
      const returnResponse = {};
      const data = string.split("~~~~~~~~");
      if (
        data[0] === "~~~~~Please try again after some time." ||
        data[0] === "~~~~~Train not found"
      ) {
        returnResponse["success"] = false;
        returnResponse["timestamp"] = Date.now();
        returnResponse["data"] = data[0].replaceAll("~", "");
        return returnResponse;
      }
      let filteredData = data[0].split("~");
      filteredData = filteredData.filter(Boolean);
      if (filteredData[1].length > 6) filteredData.shift();

      obj["trainNo"] = filteredData[1].replace("^", "");
      obj["trainName"] = filteredData[2];
      obj["fromStationName"] = filteredData[3];
      obj["fromStationCode"] = filteredData[4];
      obj["toStationName"] = filteredData[5];
      obj["toStationCode"] = filteredData[6];
      obj["fromTime"] = filteredData[11];
      obj["toTime"] = filteredData[12];
      obj["travelTime"] = filteredData[13];
      obj["runningDays"] = filteredData[14];
      filteredData = data[1].split("~");
      filteredData = filteredData.filter(Boolean);
      obj["type"] = filteredData[11];
      obj["trainId"] = filteredData[12];
      obj["distanceFromTo"] = filteredData[18];
      obj["averageSpeed"] = filteredData[19];
      // returnResponse["success"] = true;
      // returnResponse["timestamp"] = Date.now();
      // returnResponse["data"] = obj;
      return obj;
    } catch (err) {
      console.warn(err.message);
    }
  }
}

export default Scraper;
