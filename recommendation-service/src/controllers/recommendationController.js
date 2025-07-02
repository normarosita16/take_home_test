const recommendationService = require('../services/recommendationService');
const redisClient = require('../cache/redisClient')

const getWeatherRecommendation = async (req, res) => {
  try {
    const { city, date } = req.query;

    if (!city || !date) {
      return res.status(400).json({ error: 'Parameter city dan date wajib diisi.' });
    }

    const result = await recommendationService.getRecommendation(city, date);

    if (!result || !result.status) {
      return res.status(502).json({ error: 'Data rekomendasi tidak valid atau tidak tersedia.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Controller Error:', error);

    res.status(500).json({
      error: 'Gagal mengambil rekomendasi cuaca.',
      details: error.message || error.toString()
    });
  }
};


const clearCache = async (req, res) => {
  try {
    await redisClient.flushAll();
    res.status(200).json({ message: 'Cache berhasil dibersihkan' });
  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).json({ error: 'Gagal membersihkan cache' });
  }
};

module.exports = {
  getWeatherRecommendation,
  clearCache
};
