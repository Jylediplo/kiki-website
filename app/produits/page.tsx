'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Product = {
  Title: string;
  Image: string;
  Description: string;
  SupplierName: string; // Ajouter SupplierName pour identifier le fournisseur
};

const MAX_DESCRIPTION_LENGTH = 300; // Longueur maximale avant de tronquer

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((product, index) => {
        // Tronquer la description si nécessaire
        const shortDescription =
          product.Description.length > MAX_DESCRIPTION_LENGTH
            ? `${product.Description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
            : product.Description;

        // Déterminer la classe d'image en fonction du fournisseur
        const imageClass =
          product.SupplierName === 'TREESCO'
            ? 'object-cover w-full h-full p-4' // Ajouter du padding si le fournisseur est THREESCO
            : 'object-cover w-full h-full';

        return (
          <div
            key={index}
            className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-full">
              <Image
                src={product.Image}
                alt={product.Title}
                className={imageClass} // Appliquer la classe conditionnelle
                width={288} // largeur correspond à w-72 (288px)
                height={320} // hauteur correspond à h-80 (320px)
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex flex-col justify-start">
                  <p className="text-white text-base font-medium text-center">
                    {shortDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 text-center border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.Title}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
