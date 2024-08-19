'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Product {
  ID: string;
  Title: string;
  Image: string;
  Description: string;
  SubSubcategory: string;
  Subcategory: string;
  Category: string;
}

interface SimilarProductsProps {
  mainProductId: string;
  subSubcategory: string;
  subcategory: string;
  category: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  mainProductId,
  subSubcategory,
  subcategory,
  category,
}) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        let endpoint = '';

        if (subSubcategory) {
          endpoint = `/api/products?subSubcategory=${subSubcategory}`;
        } else if (subcategory) {
          endpoint = `/api/products?subcategory=${subcategory}`;
        } else {
          endpoint = `/api/products?category=${category}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch similar products');
        }
        const data: Product[] = await response.json();

        // Filter out the main product and products with duplicate titles
        const seenTitles = new Set<string>();
        const filteredProducts = data.filter((product) => {
          const isDuplicate = seenTitles.has(product.Title);
          seenTitles.add(product.Title);

          return (
            product.ID !== mainProductId && // Exclude the main product
            !isDuplicate && // Exclude duplicates based on Title
            (subSubcategory
              ? product.SubSubcategory === subSubcategory
              : subcategory
              ? product.Subcategory === subcategory
              : product.Category === category)
          );
        });

        setSimilarProducts(filteredProducts);
      } catch (error) {
        setError('Failed to load similar products.');
        console.error('Error fetching similar products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [mainProductId, subSubcategory, subcategory, category]);

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>
        <ScrollMenu>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 m-4 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Skeleton height="100%" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 text-center border-t border-gray-200">
                <Skeleton width="80%" />
              </div>
            </div>
          ))}
        </ScrollMenu>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-white">
        Produits similaires
      </h2>
      <ScrollMenu>
        {similarProducts.map((product) => (
          <Link
            key={product.ID}
            href={`/produits/${encodeURIComponent(product.ID)}`}
          >
            <div className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 m-4 cursor-pointer border-primary border-2">
              <div className="relative w-full h-full">
                <Image
                  src={product.Image}
                  alt={product.Title}
                  className="object-contain w-full h-full"
                  width={150}
                  height={150}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
                  <p className="text-white text-base font-medium text-center">
                    {product.Description.length > 100
                      ? product.Description.substring(0, 100) + '...'
                      : product.Description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-50 p-4 text-center border-t border-primary">
                <h2 className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.Title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default SimilarProducts;
