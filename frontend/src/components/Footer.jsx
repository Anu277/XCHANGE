import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='bg-slate-900 '>
      <div className='container  m-auto p-4 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  text-sm '>

        <div>
          <img src={assets.logo} className='mb-5 w-48' alt="" />
          <p className='w-full md:w-2/3 text-gray-400'>
            At XchangeTechs, we are committed to providing top-quality products at the best prices. With a focus on customer satisfaction, we ensure reliable supply and seamless service, making us a trusted partner for all your needs.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-gray-200'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-400'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-gray-200'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-400'>
            <li>+91 88677 71117</li>
            <li>sales_inquiries@xchangetechs.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='w-3/4 m-auto' />
        <p className='py-5 text-sm text-center text-gray-400'>
          Copyright 2024@ xchangetechs.com - All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
