'use client';

import { useState } from 'react';

const Address: React.FC = () => {
  const coordinates = '44.875814047057524, 4.8662805367106605';
  const [selectedService, setSelectedService] = useState('');

  const handleDirections = () => {
    let url = '';

    switch (selectedService) {
      case 'google':
        url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
        break;
      case 'waze':
        url = `https://waze.com/ul?q=${coordinates}`;
        break;
      case 'apple':
        url = `http://maps.apple.com/?daddr=${coordinates}`;
        break;
      default:
        return;
    }

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-6 bg-primary shadow-lg rounded-md flex flex-col items-center mt-4">
      <h3 className="text-lg font-semibold text-center text-text-light">
        Rue Pierre Seghers, 26800 Portes-lès-Valence
      </h3>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className="mt-2 p-2 border rounded-lg"
      >
        <option value="" disabled>
          Choisissez un service
        </option>
        <option value="google">Google Maps</option>
        <option value="waze">Waze</option>
        <option value="apple">Plan</option>
      </select>
      <button
        onClick={handleDirections}
        className="mt-2 text-white font-extrabold bg-primary-olive p-2 rounded-lg"
        disabled={!selectedService}
      >
        Y ALLER
      </button>
    </div>
  );
};

export default Address;
