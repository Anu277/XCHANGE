import React from 'react';
import { useLocation } from 'react-router-dom';

const Title = ({ text1, text2 }) => {
  const location = useLocation();

  // Check if the current path is the home page
  const isHome = location.pathname === '/';

  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p
        className={`${
          isHome ? 'text-gray-200' : 'text-black'
        }`}
      >
        {text1}{' '}
        <span
          className={`${
            isHome ? 'text-gray-400' : 'text-gray-900'
          } font-medium`}
        >
          {text2}
        </span>
      </p>
      <p
        className={`w-8 sm:w-12 h-[1px] sm:h-[2px] ${
          isHome ? 'bg-gray-700' : 'bg-gray-300'
        }`}
      ></p>
    </div>
  );
};

export default Title;
