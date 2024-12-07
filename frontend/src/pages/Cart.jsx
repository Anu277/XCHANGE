// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {

//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {

//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               // size: item,
//               quantity: cartItems[items][item]
//             })
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products])

//   return (
//     <div className='border-t pt-14'>

//       <div className=' text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         {
//           cartData.map((item, index) => {

//             const productData = products.find((product) => product._id === item._id);

//             return (
//               <div key={index} className='py-4 border-t border-b text-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
//                 <div className=' flex items-start gap-6 p-2 '>
//                   <img className='w-16 sm:w-20 p-2 bg-white rounded-sm' src={productData.image[0]} alt="" />
//                   <div>
//                     <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                     <div className='flex items-center gap-5 mt-2'>
//                       <p>{currency}{productData.price}</p>
//                       {/* <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-black' type="number" min={1} defaultValue={item.quantity} />
//                 <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer invert' src={assets.bin_icon} alt="" />
//               </div>
//             )

//           })
//         }
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className=' w-full text-end'>
//             <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Cart







// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   const handleQuantityChange = (id, size, newQuantity) => {
//     if (newQuantity <1) return; // prevent setting quantity less than 1
//     updateQuantity(id, size, newQuantity);
//   };

//   const handleIncrease = (id, size, currentQuantity) => {
//     handleQuantityChange(id, size, currentQuantity + 1);
//   };

//   const handleDecrease = (id, size, currentQuantity) => {
//     if (currentQuantity > 1) {
//       handleQuantityChange(id, size, currentQuantity - 1);
//     }
    
//   };

//   return (
//     <div className='border-t pt-14'>
//       <div className=' text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         {cartData.map((item, index) => {
//           const productData = products.find((product) => product._id === item._id);

//           return (
//             <div
//               key={index}
//               className='py-4 border-t border-b text-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
//             >
//               <div className='flex items-start gap-6 p-2'>
//                 <img
//                   className='w-16 sm:w-20 p-2 bg-white rounded-sm'
//                   src={productData.image[0]}
//                   alt=''
//                 />
//                 <div>
//                   <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                   <div className='flex items-center gap-5 mt-2'>
//                     <p>{currency}{productData.price}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='flex items-center gap-2'>
//                 <button
//                   onClick={() => handleDecrease(item._id, item.size, item.quantity)}
//                   className='bg-gray-200 p-1 rounded-md text-black'
//                 >
//                   -
//                 </button>
//                 <input
//                   className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-black'
//                   type='number'
//                   min={1}
//                   value={item.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(item._id, item.size, Number(e.target.value))
//                   }
//                 />
//                 <button
//                   onClick={() => handleIncrease(item._id, item.size, item.quantity)}
//                   className='bg-gray-300 p-1 rounded-md text-black'
//                 >
//                   +
//                 </button>
//               </div>
//               <img
//                 onClick={() => updateQuantity(item._id, item.size, 0)}
//                 className='w-4 mr-4 sm:w-5 cursor-pointer invert'
//                 src={assets.bin_icon}
//                 alt=''
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className='w-full text-end'>
//             <button
//               onClick={() => navigate('/place-order')}
//               className='bg-black text-white text-sm my-8 px-8 py-3'
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;












// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {

//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {

//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item]
//             })
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products])
//   return (
//     <div className='border-t pt-14'>

//       <div className=' text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         { !cartData.length>0?
        
//           (
//             <div className='my-52 m-auto flex flex-col gap-10'>
//                 <p className='text-4xl'>No items are added to cart</p>
//                 <a href='/collections' className='underline cursor-pointer'> Browse products</a>
//             </div>
//           )
        
//         :
//           (cartData.map((item, index) => {

//             const productData = products.find((product) => product._id === item._id);

//             return (
//               <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
//                 <div className=' flex items-start gap-6'>
//                   <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
//                   <div>
//                     <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                     <div className='flex items-center gap-5 mt-2'>
//                       <p>{currency}{productData.price}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
//                 <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
//               </div>
//             )

//           }))
//         }
//       </div>

//       <div className='flex justify-end my-40'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className=' w-full text-end'>
//             <button onClick={() => cartData.length>0 ? navigate('/place-order'):'' } className= {`${cartData.length>0?'bg-black':'bg-gray-800 disabled: cursor-not-allowed'}  text-white text-sm my-8 px-8 py-3`} >PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Cart




////////////////////////////////////////////////////////////////////////////////////

// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {
//   const { products,allAddedProducts, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   let tempCartItems=[]

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   const handleIncrease = (id, size, currentQuantity) => {
//     updateQuantity(id, size, currentQuantity + 1);
//   };

//   const handleDecrease = (id, size, currentQuantity) => {
//     if (currentQuantity > 1) {
//       updateQuantity(id, size, currentQuantity - 1);
//     }
//   };

//   return (
//     <div className='border-t pt-14'>
//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         {!cartData.length > 0 ? (
//           <div className=' m-auto  flex justify-center align-middle items-center flex-col gap-10 min-h-dvh'>
//           <p className='text-4xl text-gray-600'>No items in the cart</p>
//           <a href='/collection' className='underline cursor-pointer text-black'>
//             Browse products
//           </a>
//         </div>
//         ) : (
//           cartData.map((item, index) => {
//             // const productData = products.find((product) =>{ product._id === item._id});
//             const productData = products.find((product) => {
//               if (product._id === item._id) {
//                   return true; // Return true if a matching product is found
//               } else {
//                   tempCartItems.push(item._id); // Push to tempCartItems if not found
//                   return false; // Explicitly return false for non-matches
//               }
//             });
//             if (!productData) return (
//             <div>

//             </div>
//             );

//             return (
//               <div
//                 key={index}
//                 className='py-4 border-t border-b text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
//               >
//                 <div className='flex items-start gap-6'>
//                   <img
//                     className='w-16 sm:w-20 md:w-28'
//                     src={productData.image[0] ||productData.images[0] }
//                     alt=''
//                   />
//                   <div>
//                     <p className='text-xs sm:text-lg font-medium'>
//                       {productData.name || productData.title}
//                     </p>
//                     <div className='flex items-center gap-5 mt-2'>
//                       <p>
//                         {currency}
//                         {productData.price || productData.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className='flex items-center gap-2'>
//                   <button
//                     onClick={() =>
//                       handleDecrease(item._id, item.size, item.quantity)
//                     }
//                     className={` px-2 py-1 rounded-md text-black ${item.quantity==1?" disabled bg-gray-200 ":" bg-gray-300"}`}
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       handleIncrease(item._id, item.size, item.quantity)
//                     }
//                     className='bg-gray-300 text-black px-2 py-1 rounded-md'
//                   >
//                     +
//                   </button>
//                 </div>

//                 <img
//                   onClick={() => updateQuantity(item._id, item.size, 0)}
//                   className='w-4 mr-4 sm:w-5 cursor-pointer '
//                   src={assets.bin_icon}
//                   alt=''
//                 />
//               </div>
//             );
//           }) 
          
//         )
//         }
//       </div>

//       <div className='flex justify-end my-40'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className='w-full text-end'>
//             <button
//               onClick={() =>
//                 cartData.length > 0 ? navigate('/place-order') : ''
//               }
//               className={`${
//                 cartData.length > 0
//                   ? 'bg-black text-white'
//                   : 'bg-gray-400 disabled:cursor-not-allowed'
//               } text-black text-sm my-8 px-8 py-3`}
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (item?.sizes) {
        for (const size in item.sizes) {
          const quantity = item.sizes[size];
          if (quantity > 0) {
            tempData.push({
              _id: itemId,
              productData: item.productData,
              size,
              quantity,
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleIncrease = (id, size, currentQuantity) => {
    updateQuantity(id, size, currentQuantity + 1);
  };

  const handleDecrease = (id, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, size, currentQuantity - 1);
    }
  };

  console.log("cartData")
  console.log(cartData)

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {!cartData.length ? (
          <div className="m-auto flex justify-center align-middle items-center flex-col gap-10 min-h-dvh">
            <p className="text-4xl text-gray-600">No items in the cart</p>
            <a href="/collection" className="underline cursor-pointer text-black">
              Browse products
            </a>
          </div>
        ) : (
          cartData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 md:w-28"
                  src={item.productData.image?.[0] ||item.productData.images?.[0] || item.productData.url_image}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {item.productData.name || item.productData.title}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {item.productData.price_upper}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item._id, item.size, item.quantity)}
                  className={`px-2 py-1 rounded-md text-black ${
                    item.quantity === 1 ? 'disabled bg-gray-200' : 'bg-gray-300'
                  }`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item._id, item.size, item.quantity)}
                  className="bg-gray-300 text-black px-2 py-1 rounded-md"
                >
                  +
                </button>
              </div>

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            
            
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end my-40">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => (cartData.length > 0 ? navigate('/place-order') : '')}
              className={`${
                cartData.length > 0
                  ? 'bg-black text-white'
                  : 'bg-gray-400 disabled:cursor-not-allowed'
              } text-black text-sm my-8 px-8 py-3`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
