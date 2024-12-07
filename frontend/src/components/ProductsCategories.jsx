import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from './Title'; // Assuming the Title component is reusable

// Import images
import ai from '../assets/categories/ai.jpg';
import business from '../assets/categories/business.jpeg';
import cloud from '../assets/categories/cloudd.png';
import computer from '../assets/categories/computer.webp';
import cpu from '../assets/categories/cpu.jpeg';
import gaming from '../assets/categories/gaming.jpeg';
import mobiles from '../assets/categories/mobiles.jpg';
import network from '../assets/categories/network.jpeg';
import peripheral from '../assets/categories/peripheral.jpg';
import security from '../assets/categories/security.jpeg';
import server from '../assets/categories/server.jpeg';
import smarthome from '../assets/categories/smarthome.jpeg';
import software from '../assets/categories/softwares.webp';
import storage from '../assets/categories/storage.jpeg';
import vr from '../assets/categories/vrs.webp';
import wearables from '../assets/categories/wearables.jpeg';

// Define categories with images
const categories = [
  { name: "Computers & Laptops", image: computer },
  { name: "Networking & Connectivity", image: network },
  { name: "Storage & Data Management", image: storage },
  { name: "Peripherals & Accessories", image: peripheral },
  { name: "Software & Licenses", image: software },
  { name: "Mobile Devices", image: mobiles },
  { name: "Smart Home & IoT", image: smarthome },
  { name: "Gaming Gear", image: gaming },
  { name: "Business & Office IT", image: business },
  { name: "Data Center & Server Products", image: server },
  { name: "Computer Components & Upgrades", image: cpu },
  { name: "Tech Gadgets & Wearables", image: wearables },
  { name: "Security & Surveillance", image: security },
  { name: "VR/AR & 3D Tech", image: vr },
  { name: "Cloud & Virtualization", image: cloud },
  { name: "AI & Robotics", image: ai },
];

const ProductCategories = () => {
  // State to toggle between showing top 8 and all categories
  const [showAll, setShowAll] = useState(false);

  // Toggle the visibility of additional categories
  const handleToggle = () => setShowAll(!showAll);

  // Determine the categories to display
  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <section className="py-12 bg-[#1E1E2E]">
      <div className="container mx-auto px-4">
        {/* Title styled like FeaturedCollection */}
        <div className="text-center py-8 text-3xl">
          <Title text1={'SHOP BY'} text2={'CATEGORIES'} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400">
            Explore our diverse product categories and find everything you need for your technology needs at XchangeTechs.
          </p>
        </div>

        {/* Grid layout for categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedCategories.map((category) => (
            <Link
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={category.name}
              className="bg-[#252A34] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Square image container */}
              <div className="relative flex items-center justify-center w-full aspect-square bg-white">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <span className="text-blue-400 text-xl font-bold">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Show more/less button */}
        <div className="text-center mt-8">
          <button
            onClick={handleToggle}
            className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
