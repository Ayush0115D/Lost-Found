// src/components/LostForm.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { metroLines, stations } from '../data/stations';
import { useNavigate } from 'react-router-dom';

export default function LostForm() {
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const navigate = useNavigate();

  const filteredStations = selectedLine
    ? stations.filter(station => station.line === selectedLine.value)
    : [];

  const lineOptions = metroLines.map(line => ({ label: line, value: line }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lost item submitted');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Report Lost Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Item Description" className="w-full border p-2 rounded" required />

        <Select
          options={lineOptions}
          placeholder="At which Metro Line?"
          value={selectedLine}
          onChange={setSelectedLine}
        />

        <Select
          options={filteredStations}
          placeholder="At which Station?"
          value={selectedStation}
          onChange={setSelectedStation}
          isSearchable
          isDisabled={!selectedLine}
        />

        <input type="file" accept="image/*" className="block w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
