'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  Product,
  categorizeProduct,
  groupByCategory,
} from '../Utils/categoryUtils';

const MAX_DESCRIPTION_LENGTH = 300;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [activeSubSubcategory, setActiveSubSubcategory] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();

        const categorizedProducts = data.map((product) => ({
          ...product,
          ...categorizeProduct(product.Title),
        }));

        setProducts(categorizedProducts);

        if (categorizedProducts.length > 0) {
          const defaultCategory = categorizedProducts[0].Category;
          setActiveCategory(defaultCategory);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (activeCategory === '' || product.Category === activeCategory) &&
        (activeSubcategory === '' ||
          product.Subcategory === activeSubcategory) &&
        (activeSubSubcategory === '' ||
          product.SubSubcategory === activeSubSubcategory)
    );
    setFilteredProducts(filtered);
  }, [activeCategory, activeSubcategory, activeSubSubcategory, products]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory('');
    setActiveSubSubcategory('');
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setActiveSubSubcategory('');
  };

  const handleSubSubcategoryClick = (
    category: string,
    subcategory: string,
    subSubcategory: string
  ) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setActiveSubSubcategory(subSubcategory);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <ul className="flex justify-center mb-6 relative z-10">
        {Object.keys(groupByCategory(products)).map((category) => (
          <li key={category} className="relative group">
            <button
              className={`px-4 py-2 shadow-md transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-indigo-800 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
            {groupByCategory(products)[category] && (
              <ul className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg z-20">
                {Object.keys(groupByCategory(products)[category]).map(
                  (subcategory) =>
                    subcategory && (
                      <li
                        key={subcategory}
                        className="relative group/subcategory"
                      >
                        <button
                          className={`block px-4 py-2 text-left w-full ${
                            activeSubcategory === subcategory
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-indigo-400 hover:text-white'
                          }`}
                          onClick={() =>
                            handleSubcategoryClick(category, subcategory)
                          }
                        >
                          {subcategory}
                        </button>
                        {groupByCategory(products)[category][subcategory] && (
                          <ul className="absolute left-full top-0 hidden group-hover/subcategory:block bg-white shadow-lg rounded-lg z-30">
                            {Object.keys(
                              groupByCategory(products)[category][subcategory]
                            ).map(
                              (subSubcategory) =>
                                subSubcategory && (
                                  <li key={subSubcategory}>
                                    <button
                                      className={`block px-4 py-2 text-left w-full ${
                                        activeSubSubcategory === subSubcategory
                                          ? 'bg-indigo-600 text-white'
                                          : 'bg-gray-100 text-gray-800 hover:bg-indigo-400 hover:text-white'
                                      }`}
                                      onClick={() =>
                                        handleSubSubcategoryClick(
                                          category,
                                          subcategory,
                                          subSubcategory
                                        )
                                      }
                                    >
                                      {subSubcategory}
                                    </button>
                                  </li>
                                )
                            )}
                          </ul>
                        )}
                      </li>
                    )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div>
        <div className="flex flex-wrap justify-center gap-6">
          {filteredProducts.map((product, index) => {
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
                <div className="relative w-full h-full p-4">
                  <Image
                    src={product.Image}
                    alt={product.Title}
                    className="object-contain w-full h-full"
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
