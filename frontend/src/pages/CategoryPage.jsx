import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const CategoryPage = () => {
  window.scrollTo(0, 0);
  const { slug } = useParams();
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([categoryName]);
  const [sortType, setSortType] = useState("relevant");
  const [isLoading, setIsLoading] = useState(true);
  
  const applyFilter = async () => {
    setIsLoading(true);
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      productsCopy = productsCopy.filter((item) => selectedCategories.includes(item.category));
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setFilterProducts(productsCopy);
    setIsLoading(false);
  };

  const sortProduct = () => {
    setIsLoading(true);
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategories, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const foodVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex flex-col justify-center sm:flex-row gap-1 sm:gap-10 pt-10 border-t py-10 bg-gray-200 min-h-dvh">
      <div className="container flex-1">
        <div className="flex justify-between items-center m-auto text-base sm:text-2xl mb-4 space-x-4">
          <Title text1={"ALL PRODUCTS ON -"} text2={`${categoryName.toUpperCase()}`} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 max-h-7 border-gray-300 text-sm px-2 py-1"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 p-4">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <motion.div
                  key={index}
                  variants={foodVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                </motion.div>
              ))
            ) : (
              <div className='m-auto flex justify-center align-middle items-center flex-col gap-10 min-h-dvh'>
                <p className='text-4xl text-gray-400'>No products found</p>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;