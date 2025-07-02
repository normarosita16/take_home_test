const axios = require('axios');
const redisClient = require('../cache/redisClient');
const { Log } = require('../../models');

const getRecommendation = async (city, date) => {
  const cacheKey = `${city}-${date}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const weatherBaseURL = process.env.WEATHER_SERVICE_URL;

  let data;
  try {
    const response = await axios.get(`${weatherBaseURL}/weather`, {
      params: { city, date },
    });
    data = response.data;
  } catch (error) {
    throw new Error('Tidak bisa mengakses weather service');
  }

  if (typeof data !== 'object') {
    throw new Error('Response dari weather service tidak valid');
  }

  const forecastDay = data.forecast?.forecastday?.find(f => f.date === date);

  if (!forecastDay) {
    throw new Error(`Data cuaca tidak tersedia untuk tanggal ${date}`);
  }

  const temperature = forecastDay.day.avgtemp_c;
  const rain_chance = parseInt(forecastDay.day.daily_chance_of_rain);
  const wind_speed = forecastDay.day.maxwind_kph;
  const condition = forecastDay.day.condition.text;

  const status = (rain_chance < 20 && temperature >= 24 && temperature <= 32 && wind_speed < 25)
    ? 'Cocok'
    : 'Tidak Cocok';

  let alasan = '';
  if (rain_chance >= 20) alasan += `Curah hujan tinggi (${rain_chance}%) `;
  if (temperature < 24 || temperature > 32) alasan += `Suhu tidak ideal (${temperature}°C) `;
  if (wind_speed >= 25) alasan += `Angin terlalu kencang (${wind_speed} km/h)`;
  if (alasan === '') alasan = 'Cuaca sesuai untuk acara luar ruangan.';

  const result = {
    status,
    alasan: alasan.trim(),
    cuaca: {
      temperature,
      rain_chance,
      wind_speed,
      condition
    }
  };

  await redisClient.setEx(cacheKey, 600, JSON.stringify(result));
  await Log.create({ city, date, result: JSON.stringify(result) });

  return result;
};

module.exports = {
  getRecommendation
};
