// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import Loader from '../components/Loader'

// const Product = () => {

//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const { getSearchProduct, productDetail, isLoading, setIsLoading } = useContext(ShopContext)
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('');

//   let tempProductDetails={}

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [amazonProduct, setAmazonProduct] = useState(false)
//   setIsLoading(false)

//   const fetchProductData = async () => {
//     setIsLoading(true)
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//         return null;
//       }
//     });
//     setIsLoading(false)
//     setAmazonProduct(true)
//   };

//   const incrementDate = (dateString) => {
//     const date = new Date(dateString);
//     date.setDate(date.getDate() + 3);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long'
//     });
//   };

//   useEffect(() => {
//     setIsLoading(true)
//     fetchProductData();
//     // setIsLoading(false)
//   }, [productId, products]);

//   useEffect(() => {

//     setIsLoading(true)
//     getSearchProduct(productId)

//     // setIsLoading(false)
//     console.log("getSearchProduct")
//   }, [amazonProduct])

//   setIsLoading(false)


//   // // Fetch product from external source if not found in local products
//   // useEffect(() => {
//   //   if (amazonProduct) {
//   //     getSearchProduct(productId).then((externalProduct) => {
//   //       setProductData(externalProduct);
//   //       setImage(externalProduct?.image?.[0] || '');
//   //     });
//   //   }
//   // }, [amazonProduct, productId, getSearchProduct]);

//   // // Trigger fetchProductData when productId or products change
//   // useEffect(() => {
//   //   fetchProductData();
//   // }, [productId, products]);


//   if (isLoading) {
//     return (
//       <div className=" flex items-center justify-center bg-gray-200">
//         <Loader /> {/* This should render a spinner or loading indicator */}
//       </div>
//     );
//   }
//   return productData ? (
//     <div className='  border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gray-200 '>

//       {/*----------- Product Data-------------- */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         {/*---------- Product Images------------- */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//             {productData.image.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border '
//                 alt=''
//               />
//             ))}
//           </div>
//           <div className='w-full sm:w-[80%] object-contain px-2'>
//             <img className='w-full h-auto max-w-xl rounded-md  object-contain border border-gray-300' src={image} alt='' />
//           </div>
//         </div>

//         {/* -------- Product Info ---------- */}
//         <div className='flex-1'>
//           <h1 className='font-bold text-3xl mt-2 text-gray-800'>{productData.name}</h1>
//           <p className='mt-5 text-3xl font-semibold text-gray-800'>{currency}{productData.price}</p>
//           <p className='mt-5 text-gray-600'>{productData.description}</p>

//           {/* Description in Points Format */}
//           <div className='mt-5 text-gray-600'>
//             <ul className='list-inside'>
//               <li>Product Category: {productData.category}</li>
//               {/* <li>Shipping: Free worldwide shipping available.</li>
//               <li>Returns: 7-day easy return policy.</li> */}
//             </ul>
//           </div>
//           <br />
//           {/* Add to Cart Button */}
//           <button
//             // onClick={() => addToCart(productData._id)}
//             onClick={() => addToCart(productData)}
//             className='text-gray-200 bg-black px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:-translate-y-1'
//           >
//             ADD TO CART
//           </button>
//           <hr className='mt-8 sm:w-4/5' />
//           <div className='text-sm text-gray-800 mt-5 flex flex-col gap-1'>
//             {/* <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p> */}
//           </div>
//         </div>
//       </div>

//       {/* --------- display related products ---------- */}
//       <RelatedProducts category={productData.category} />
//     </div>

//   )
//     :
//     (
//       productDetail &&
//       (

//         <div className=" max-w-7xl mx-auto p-4 md:p-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Image Gallery Section */}
//             <div className="space-y-4">
//               {/* Main Image */}
//               <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
//                 <img
//                   src={productDetail.images[selectedImage]}
//                   alt="Product image"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//               {/* Thumbnail Gallery */}
//               <div className="grid grid-cols-5 gap-2">
//                 {productDetail.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`relative aspect-square overflow-hidden rounded-md border ${selectedImage === index ? 'ring-2 ring-black' : ''
//                       }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Product thumbnail ${index + 1}`}
//                       className="object-cover w-full h-full"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Product Details Section */}
//             <div className="space-y-6">
//               <h1 className="text-2xl md:text-3xl font-bold">
//                 {productDetail.title}
//               </h1>

//               <div className="space-y-2">
//                 <p className="text-3xl font-bold">₹{productDetail.price_upper.toLocaleString()}</p>
//                 <p className="text-green-600">
//                   Delivery by {incrementDate(productDetail.delivery[0].date.by)}
//                 </p>
//               </div>

//               <button onClick={
//                 () => {
//                   tempProductDetails=productDetail
//                   addToCart(tempProductDetails)
//                 }} 

//                 className='text-gray-200 bg-black px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:-translate-y-1'
//               >
//                 ADD TO CART
//               </button>

//               {/* Description */}
//               {productDetail.description && (
//                 <div className="space-y-2">
//                   <h2 className="text-xl font-semibold">Description</h2>
//                   <p>{productDetail.description}</p>
//                 </div>
//               )}

//               {/* Key Features */}
//               <div className="space-y-4">
//                 <h2 className="text-xl font-semibold">Key Features</h2>
//                 <ul className="space-y-2">
//                   {productDetail.bullet_points.split('\n').map((point, index) => (
//                     <li key={index} className="flex items-start gap-2">
//                       <span className="text-gray-600">•</span>
//                       <span>{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Product Specifications */}
//               {/* <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Product Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.entries(productDetail.product_details).map(([key, value]) => (
//                   <p key={key} className="flex justify-between">
//                     <span className="text-gray-600">{key}</span>
//                     <span>{value}</span>
//                   </p>
//                 ))}
//               </div>
//             </div> */}

//             </div>
//           </div>
//           {/* <RelatedProducts category={productData.category} /> */}
//         </div>

//         // <div></div>
//       ) || (
//         <div className='min-h-dvh'>

//         </div>
//       )
//     );
// };

// export default Product;




import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import Loader from '../components/Loader';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems, updateQuantity } = useContext(ShopContext);
  const { getSearchProduct, productDetail, isLoading, setIsLoading } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [amazonProduct, setAmazonProduct] = useState(false);

  const id = productId
  const [quantity, setQuantity] = useState(() => {
    const productInCart = cartItems[id];
    return productInCart ? Object.values(productInCart).reduce((sum, qty) => sum + qty, 0) : 0;
  });

  const incrementDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
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
    addToCart(productDetail || productData, 'default', 1); // Assuming "default" size
  };

  // Fetch product data from local or Amazon API
  const fetchProductData = async () => {
    setIsLoading(true);
    let foundProduct = false;

    // Check if the product is already in the local products
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        foundProduct = true;
      }
    });

    // If not found in local products, fetch from external source (Amazon API)
    if (!foundProduct) {
      await getSearchProduct(productId);
    }

    setIsLoading(false);  // Only set loading to false after data is fetched
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // For Amazon product lookup
  useEffect(() => {
    if (amazonProduct) {
      getSearchProduct(productId);
    }
  }, [amazonProduct]);

  // Render the loader until the product data is available
  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-200">
        <Loader /> {/* This should render a spinner or loading indicator */}
      </div>
    );
  }

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gray-200">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] object-contain px-2">
            <img className="w-full h-auto max-w-xl rounded-md object-contain border border-gray-300" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-bold text-3xl mt-2 text-gray-800">{productData.name}</h1>
          <p className="mt-5 text-3xl font-semibold text-gray-800">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-600">{productData.description}</p>

          <div className="mt-5 text-gray-600">
            <ul className="list-inside">
              <li>Product Category: {productData.category}</li>
            </ul>
          </div>
          <br />
          {/* <button
            onClick={() => addToCart(productData)}
            className="text-gray-200 bg-black px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:-translate-y-1"
          >
            ADD TO CART
          </button> */}
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
          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    productDetail && (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
              <img
                src={productDetail.images[selectedImage]}
                alt="Product image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {productDetail.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md border ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold">{productDetail.title}</h1>
            <div className="space-y-2">
              <p className="text-3xl font-bold">₹{productDetail.price_upper.toLocaleString()}</p>
              <p className="text-green-600">
                Delivery by {incrementDate(productDetail.delivery[0].date.by)}
              </p>
            </div>
            {/* <button
              onClick={() => addToCart(productDetail)}
              className="text-gray-200 bg-black px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:-translate-y-1"
            >
              ADD TO CART
            </button> */}
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
            {productDetail.description && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <p>{productDetail.description}</p>
              </div>
            )}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Key Features</h2>
              <ul className="space-y-2">
                {productDetail.bullet_points.split('\n').map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-600">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Product;
