'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Product = {
  Title: string;
  Image: string;
  Description: string;
  SupplierName: string;
  Category: string;
};

const MAX_DESCRIPTION_LENGTH = 300;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Vêtements');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();

      const categorizedProducts = data.map((product) => ({
        ...product,
        Category: categorizeProduct(product.Title),
      }));

      setProducts(categorizedProducts);
    };

    fetchProducts();
  }, []);

  const categorizeProduct = (title: string): string => {
    if (title.match(/Blouson|Shirt|Veste|Pantalon|Chemise|Parka|Gilet|Pull/i)) {
      return 'Vêtements';
    } else if (title.match(/Casquette|Gant|Bonnet|Ceinturon|Guêtre/i)) {
      return 'Accessoires';
    } else if (title.match(/Chaussure|Sabot/i)) {
      return 'Chaussures';
    } else if (title.match(/Fourreau|Sac|Bâton/i)) {
      return 'Équipements';
    } else if (title.match(/Viseur|Monoculaire/i)) {
      return 'Optiques';
    } else {
      return 'Autres';
    }
  };

  const groupByCategory = (products: Product[]) => {
    return products.reduce((acc, product) => {
      const category = product.Category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };

  const categorizedProducts = groupByCategory(products);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex justify-center space-x-4 mb-6">
        {Object.keys(categorizedProducts).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-indigo-800 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap justify-center gap-6">
          {categorizedProducts[activeCategory]?.map((product, index) => {
            const shortDescription =
              product.Description.length > MAX_DESCRIPTION_LENGTH
                ? `${product.Description.substring(
                    0,
                    MAX_DESCRIPTION_LENGTH
                  )}...`
                : product.Description;

            return (
              <div
                key={index}
                className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.Image}
                    alt={product.Title}
                    className="object-cover w-full h-full"
                    width={288}
                    height={320}
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
      </div>
    </div>
  );
};

export default Products;
