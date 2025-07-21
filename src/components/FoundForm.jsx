// src/components/FoundForm.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { metroLines, getStationsForLine } from './stations'; 
import { useNavigate } from 'react-router-dom';

export default function FoundForm() {
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const navigate = useNavigate();

  const filteredStations = selectedLine
    ? getStationsForLine(selectedLine.value)
    : [];

  const lineOptions = metroLines.map(line => ({
    label: line.label,
    value: line.value,
    description: line.description
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Found item submitted');
    console.log('Line:', selectedLine);
    console.log('Station:', selectedStation);
    // Add form submission logic here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Report Found Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Item Description" className="w-full border p-2 rounded" required />

        <Select
          options={lineOptions}
          placeholder="At which Metro Line?"
          value={selectedLine}
          onChange={(line) => {
            setSelectedLine(line);
            setSelectedStation(null); // reset station on line change
          }}
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
