import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ProductItem = ({ item, id, image, name, price }) => {

  const { addToCart, updateQuantity, cartItems } = useContext(ShopContext);
  const [isFavorited, setIsFavorited] = useState(false);

  // Track quantity locally
  const [quantity, setQuantity] = useState(() => {
    const productInCart = cartItems[id];
    return productInCart ? Object.values(productInCart).reduce((sum, qty) => sum + qty, 0) : 0;
  });


  // Handle toggle favorite
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Optionally save favorite status to a database or context
  };

  // Format price
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Increase quantity
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, 'default', newQuantity); // Assuming "default" size
  };

  // Decrease quantity
  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(id, 'default', newQuantity); // Assuming "default" size
    } else {
      setQuantity(0);
      updateQuantity(id, 'default', 0);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    setQuantity(1);
    addToCart(item, 'default', 1); // Assuming "default" size
  };

  return (

    <div
      className="max-w-7xl border border-gray-200 bg p-6 my-3 rounded-lg  duration-300 flex flex-row md:flex-row flex-start gap-3 justify-start felx-wrap relative"
    >
      {/* Favorite Icon */}
      <div
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-shadow z-10"
        onClick={toggleFavorite}
      >
        {isFavorited ? (
          <AiFillHeart className="text-[#F3441C] text-xl" />
        ) : (
          <AiOutlineHeart className="text-[#F3441C] text-xl" />
        )}
      </div>

      <div className=' max-w-72 md:w-56 border-r border-gray-200 my-auto ' >
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to={`/product/${id}`}
        >
          <img
            src={image}
            alt={name}
            className="max-w-32 md:w-40 md:h-56 object-contain rounded "
          />
        </Link>
      </div>


      <div className="flex-start space-y-3 max-w-xl md:max-w-6xl">
        <Link to={`/product/${id}`}>
          <h2
            className="text-xl font-semibold line-clamp-1 md:line-clamp-2 max-w-6xl"
          >
            {name}
          </h2>
        </Link>
        <p className="text-gray-600 line-clamp-1 md:line-clamp-3 max-w-6xl">{name}</p>
        <span className="text-2xl font-bold text-green-600 block">₹{formatPrice(price)}</span>

        {quantity > 0 ? (
          <div
            className="flex items-center gap-3"
          >
            <button
              onClick={handleDecrease}
              className="bg-gray-300 text-black px-3 py-1 rounded-md"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-gray-300 text-black px-3 py-1 rounded-md"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 text-gray-900 px-6 py-2 rounded text-sm font-semibold hover:bg-yellow-500 transition-colors duration-300 w-fit"

          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>

  );
};

export default ProductItem;

