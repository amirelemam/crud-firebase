const axios = require("axios");
const { UnprocessableEntityError } = require("./errors");
const { throwError } = require("./utils");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const getLocationDetails = async (zipCode) => {
  try {
    // verify if zip code is valid
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${OPENWEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw new UnprocessableEntityError(`Invalid zip code: ${zipCode}. Please provide a valid zip code.`);
    }
    throwError(error, "Failed to get location by zip code", 400);
  }
}

const getLocationByZipCode = async (zipCode) => {
  try {
    const locationDetails = await getLocationDetails(zipCode);
    const { lat, lon } = locationDetails;

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
    return {
      lat,
      lon,
      timezone: weatherResponse.data.timezone,
    };
  } catch (error) {
    throwError(error, "Failed to get timezone data");
  }
}

module.exports = { getLocationByZipCode };