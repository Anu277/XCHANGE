// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { Link } from 'react-router-dom';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

// const ProductCard = ({item, id, image, name, price }) => {

//   const { addToCart, updateQuantity, cartItems } = useContext(ShopContext);
//   const [isFavorited, setIsFavorited] = useState(false);

//   // Track quantity locally
//   const [quantity, setQuantity] = useState(() => {
//     const productInCart = cartItems[id];
//     return productInCart ? Object.values(productInCart).reduce((sum, qty) => sum + qty, 0) : 0;
//   });

  
//   // Handle toggle favorite
//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//     // Optionally save favorite status to a database or context
//   };

//   // Format price
//   const formatPrice = (price) => {
//     return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//   };

//   // Increase quantity
//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     updateQuantity(id, 'default', newQuantity); // Assuming "default" size
//   };

//   // Decrease quantity
//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       updateQuantity(id, 'default', newQuantity); // Assuming "default" size
//     } else {
//       setQuantity(0);
//       updateQuantity(id, 'default', 0);
//     }
//   };

//   // Handle adding to cart
//   const handleAddToCart = () => {
//     setQuantity(1);
//     addToCart(item, 'default', 1); // Assuming "default" size
//   };

//   return (
//     <div className='relative bg-white max-w-7xl p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-center'>
//       {/* Favorite Icon */}
//       <div
//         className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-shadow'
//         onClick={toggleFavorite}
//       >
//         {isFavorited ? (
//           <AiFillHeart className='text-[#F3441C] text-xl' />
//         ) : (
//           <AiOutlineHeart className='text-[#F3441C] text-xl' />
//         )}
//       </div>

//       <Link
//         onClick={() => window.scrollTo(0, 0)}
//         className='h-56 w-52 overflow-hidden'
//         to={`/product/${id}`}
//       >
//         <div className='h-44'>
//           <img
//             className='w-40 h-40 object-cover rounded'
//             src={image}
//             alt={name}
//           />
//         </div>
//       </Link>
//       <div className='flex-grow space-y-2'>
//         <Link to={`/product/${id}`}>
//           <p className='text-xl font-semibold line-clamp-2'>{name}</p>
//         </Link>
//         <p className='text-2xl font-bold text-green-600'>{`₹${formatPrice(price)}`}</p>

//         {/* Centered Quantity or Add to Cart */}
//         <div className='mt-3 flex justify-start items-center'>
//           {quantity > 0 ? (
//             <div className='flex items-center gap-3'>
//               <button
//                 onClick={handleDecrease}
//                 className='bg-[#fffafa] text-black px-3 py-1 rounded-md'
//               >
//                 -
//               </button>
//               <span className='text-lg font-semibold'>{quantity}</span>
//               <button
//                 onClick={handleIncrease}
//                 className='bg-[#fffafa] text-black px-3 py-1 rounded-md'
//               >
//                 +
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={handleAddToCart}
//               className='bg-[#F3441C] bg-yellow-400 text-gray-900 px-6 py-2 rounded text-lg font-semibold hover:bg-yellow-500 transition-colors duration-300'
//             >
//               ADD TO CART
//             </button>
//           )}
//         </div>
//       </div>
//     </div>


    
//   );
// };

// export default ProductCard;


import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ProductCard = ({ item, id, image, name, price }) => {
  const { addToCart, updateQuantity, cartItems } = useContext(ShopContext);
  const [isFavorited, setIsFavorited] = useState(false);

  const [quantity, setQuantity] = useState(() => {
    const productInCart = cartItems[id];
    return productInCart ? Object.values(productInCart).reduce((sum, qty) => sum + qty, 0) : 0;
  });

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, 'default', newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(id, 'default', newQuantity);
    } else {
      setQuantity(0);
      updateQuantity(id, 'default', 0);
    }
  };

  const handleAddToCart = () => {
    setQuantity(1);
    addToCart(item, 'default', 1);
  };

  return (
    <div className="bg-white rounded-lg m-3 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to={`/product/${id}`}
          className="block aspect-square overflow-hidden"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            src={image}
            alt={name}
          />
        </Link>
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
          onClick={toggleFavorite}
        >
          {isFavorited ? (
            <AiFillHeart className="text-red-500 text-xl" />
          ) : (
            <AiOutlineHeart className="text-gray-500 text-xl" />
          )}
        </button>
      </div>
      <div className="p-4">
        <Link to={`/product/${id}`} className="block mb-2">
          <h3 className="text-lg font-semibold line-clamp-1 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-bold text-green-600 mb-4">{`₹${formatPrice(price)}`}</p>
        {quantity > 0 ? (
          <div className="flex items-center justify-between">
            <button
              onClick={handleDecrease}
              className="bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-[#fffafa] transition-colors"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-[#fffafa] transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-md text-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

