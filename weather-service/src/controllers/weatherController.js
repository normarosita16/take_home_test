const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { city, date } = req.query;

  try {
    const response = await axios.get(process.env.WEATHER_API_URL, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
        dt: date
      }
    });

    const result = response.data;
    res.status(200).json(result);

  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
