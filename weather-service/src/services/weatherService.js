const axios = require('axios');
const { WEATHER_API_KEY, WEATHER_API_URL } = process.env;

exports.fetchWeather = async (city) => {
  const response = await axios.get(WEATHER_API_URL, {
    params: {
      q: city,
      appid: WEATHER_API_KEY,
      units: 'metric'
    }
  });
  
  return response.data;
};
