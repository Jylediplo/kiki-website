'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

interface Product {
  Code: string;
  Title: string;
  DATE_CREATION: string;
  Description: string;
  Image: string;
}

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data: Product[] = await response.json();

        const sortedProducts = data.sort((a, b) => {
          const dateA = new Date(
            a.DATE_CREATION.split('/').reverse().join('-')
          );
          const dateB = new Date(
            b.DATE_CREATION.split('/').reverse().join('-')
          );
          return dateB.getTime() - dateA.getTime();
        });

        setProducts(sortedProducts.slice(0, 50));
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Nouveautés</h2>
      <ScrollMenu>
        {products.map((product, index) => (
          <ProductCard key={product.Code} product={product} />
        ))}
      </ScrollMenu>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const shortDescription =
    product.Description.length > 100
      ? product.Description.substring(0, 200) + '...'
      : product.Description;

  return (
    <div className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 m-4">
      <div className="relative w-full h-full">
        <Image
          src={product.Image}
          alt={product.Title}
          className="object-contain w-full h-full"
          width={288}
          height={320}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
          <p className="text-white text-base font-medium text-center">
            {shortDescription}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 text-center border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.Title}
        </h2>
      </div>
    </div>
  );
};

export default NewArrivals;
