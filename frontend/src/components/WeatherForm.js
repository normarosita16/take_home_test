import { useState } from 'react';

export default function WeatherForm({ onSubmit }) {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && date) {
      onSubmit({ city, date });
    }
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Kota</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Contoh: Jakarta"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          min={new Date().toISOString().split('T')[0]}
          max={maxDate.toISOString().split('T')[0]}
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Cek Kelayakan Acara
      </button>
    </form>
  );
}
