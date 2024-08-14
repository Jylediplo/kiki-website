'use client';

import { useState } from 'react';

const Map = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const coordinates = '44.875814047057524, 4.8662805367106605';

  const handleDirections = (service: any) => {
    let url = '';

    switch (service) {
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

    window.open(url, '_blank');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '0',
        paddingBottom: '56.25%',
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5654.706454851783!2d4.866581844482554!3d44.87546013428154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b54d160f3993d9%3A0xf8ffc9d224dcce45!2sLe%20Surplus!5e0!3m2!1sfr!2sfr!4v1723386523895!5m2!1sfr!2sfr"
        style={{
          border: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent
          padding: '8px 12px',
          borderRadius: '5px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Rue Pierre Seghers, 26800 Portes-lès-Valence
        </h3>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="mt-2 text-blue-600 hover:underline"
        >
          Itinéraire
        </button>
        {showDropdown && (
          <div className="mt-2 bg-white shadow-md rounded-md">
            <button
              onClick={() => handleDirections('google')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Google Maps
            </button>
            <button
              onClick={() => handleDirections('waze')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Waze
            </button>
            <button
              onClick={() => handleDirections('apple')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Apple Maps
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
