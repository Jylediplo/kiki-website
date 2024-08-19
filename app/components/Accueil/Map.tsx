'use client';

import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Map = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full pb-[56.25%] rounded-lg shadow-lg overflow-hidden">
      {loading && (
        <Skeleton
          height="100%"
          className="absolute top-0 left-0 w-full h-full"
        />
      )}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5654.706454851783!2d4.866581844482554!3d44.87546013428154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b54d160f3993d9%3A0xf8ffc9d224dcce45!2sLe%20Surplus!5e0!3m2!1sfr!2sfr!4v1723386523895!5m2!1sfr!2sfr"
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoading(false)} // Set loading to false once the iframe is loaded
      ></iframe>
    </div>
  );
};

export default Map;
