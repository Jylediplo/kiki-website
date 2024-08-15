// components/SimilarProducts.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

interface Product {
  ID: string;
  Title: string;
  Image: string;
  Description: string;
  Category: string;
  Subcategory: string;
  SubSubcategory: string;
}

interface SimilarProductsProps {
  category: string;
  subcategory: string;
  subsubcategory: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  category,
  subcategory,
  subsubcategory,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch similar products');
        }
        const data: Product[] = await response.json();

        // Filter products based on category, subcategory, and subsubcategory
        const filteredProducts = data
          .filter(
            (product) =>
              product.Category === category &&
              (subcategory === '' || product.Subcategory === subcategory) &&
              (subsubcategory === '' ||
                product.SubSubcategory === subsubcategory)
          )
          .filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.Title === product.Title)
          );

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };

    fetchSimilarProducts();
  }, [category, subcategory, subsubcategory]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Produits Similaires
      </h2>
      <ScrollMenu>
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </ScrollMenu>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const shortDescription =
    product.Description.length > 100
      ? product.Description.substring(0, 100) + '...'
      : product.Description;

  return (
    <Link
      href={`/produits/${encodeURIComponent(product.ID)}`}
      className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 m-4"
    >
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
            {shortDescription}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 text-center border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.Title}
        </h2>
      </div>
    </Link>
  );
};

export default SimilarProducts;
