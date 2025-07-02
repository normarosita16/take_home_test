export default function ResultCard({ result }) {
  if (!result) return null;

  const { status, alasan, cuaca } = result;

  return (
    <div className="mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Hasil Rekomendasi</h2>
      <p className={`font-semibold ${status === 'Cocok' ? 'text-green-600' : 'text-red-600'}`}>
        Status: {status}
      </p>
      <p className="text-sm mb-2">Alasan: {alasan}</p>

      {cuaca ? (
        <div className="text-sm">
          <p>Suhu: {cuaca.temperature}°C</p>
          <p>Curah Hujan: {cuaca.rain_chance}%</p>
          <p>Kecepatan Angin: {cuaca.wind_speed} km/h</p>
          <p>Kondisi: {cuaca.condition}</p>
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">Data cuaca tidak tersedia.</p>
      )}
    </div>
  );
}
