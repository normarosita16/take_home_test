import { useState } from 'react';
import api from '../utils/api';
import WeatherForm from '../components/WeatherForm';
import ResultCard from '../components/ResultCard';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async ({ city, date }) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.get('/recommendation', {
        params: { city, date },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data rekomendasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
  try {
    await api.delete('/cache');
    alert('Cache berhasil dibersihkan!');
  } catch (err) {
    console.error('Gagal membersihkan cache:', err);
    alert('Terjadi kesalahan saat membersihkan cache.');
  }
};


  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Smart Outdoor Event Planner with Weather Integration
        </h1>
        <WeatherForm onSubmit={handleSubmit} />
        {loading && <p className="mt-4">Memuat...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {result && <ResultCard result={result} />}
        <button
  onClick={handleClearCache}
  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
  Bersihkan Cache
</button>

      </div>
    </main>
  );
}
