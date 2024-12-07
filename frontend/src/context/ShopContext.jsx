import { createContext, useEffect, useState, useRef  } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    // const backendUrl = "https://xchnagetechsecom-back.onrender.com"
    // const backendUrl = "https://xchnagetechsecom-backend.onrender.com"
    const backendUrl = "http://localhost:4000"
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [allAddedProducts, setAllAddedProducts] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [token, setToken] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(false);


    // const addToCart = async (itemId, size = 'default') => {
        
    //     let cartData = structuredClone(cartItems);

    //     if (cartData[itemId]) {
    //         if (cartData[itemId][size]) {
    //             cartData[itemId][size] += 1;
    //         } else {
    //             cartData[itemId][size] = 1;
    //         }
    //     } else {
    //         cartData[itemId] = {};
    //         cartData[itemId][size] = 1;
    //     }
    //     setCartItems(cartData);

    //     if (token) {
    //         try {       
    //             setIsLoading(true)
    //             await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
    //             toast.success('Product added to cart')
    //             setIsLoading(false)
    //         } catch (error) {
    //             console.log(error);
    //             toast.error(error.message);
    //         }
    //     }
    // };

//////////////////////////////////////////////////////////


    // const addToCart = async (productData, size = 'default') => {
        
    //     setAllAddedProducts([...allAddedProducts,productData])

    //     let cartData = structuredClone(cartItems);
    //     console.log(productData);

    //     let itemId=productData._id || productData.asin;
    //     console.log(itemId)

    //     if (cartData[itemId]) {
    //     console.log(productData);

    //         cartData[itemId][productData]=productData;

    //         if (cartData[itemId][size]) {
    //             cartData[itemId][size] += 1;
    //         } else {
    //             cartData[itemId][size] = 1;
    //         }
    //     } else {
    //         cartData[itemId] = {};
    //         cartData[itemId][size] = 1;
    //     }
    //     setCartItems(cartData);
    //     console.log("cartData")
    //     console.log(cartData)

    //     if (token) {
    //         try {       
    //             setIsLoading(true)
    //             // await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
    //             await axios.post(backendUrl + '/api/cart/add', { itemId, size, productData }, { headers: { token } });
    //             toast.success('Product added to cart')
    //             setIsLoading(false)
    //         } catch (error) {
    //             console.log(error);
    //             toast.error(error.message);
    //         }
    //     }
    // };

useEffect(()=>{
    console.log("cartItems in useEffect")
    console.log(cartItems)
},[cartItems])

const addToCart = async (productData, size = 'default') => {
        setAllAddedProducts([...allAddedProducts, productData]);
    
        let cartData = structuredClone(cartItems);
        const itemId = productData._id || productData.asin;
    
        if (!cartData[itemId]) {
            cartData[itemId] = { productData, sizes: {} }; // Initialize item with productData and sizes
        }
    
        if (cartData[itemId].sizes[size]) {
            cartData[itemId].sizes[size] += 1;
        } else {
            cartData[itemId].sizes[size] = 1;
        }
    
        setCartItems(cartData);
    
        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size, productData },
                    { headers: { token } }
                );
                toast.success('Product added to cart');
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            } finally {
            }
        }
    };
    

    // const getCartCount = () => {
    //     let totalCount = 0;
    //     for (const items in cartItems) {
    //         for (const item in cartItems[items]) {
    //             try {
    //                 if (cartItems[items][item] > 0) {
    //                     totalCount += cartItems[items][item];
    //                 }
    //             } catch (error) {

    //             }
    //         }
    //     }
    //     return totalCount;
    // }


    const getCartCount = () => {
        let totalCount = 0;
    
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            if (item?.sizes) {
                for (const size in item.sizes) {
                    try {
                        const quantity = item.sizes[size];
                        if (quantity > 0) {
                            totalCount += quantity;
                        }
                    } catch (error) {
                        console.error('Error calculating cart count:', error);
                    }
                }
            }
        }
    
        return totalCount;
    };

    
    
    // const updateQuantity = async (itemId, size, quantity) => {e
    //     setIsLoading(true)
    //     let cartData = structuredClone(cartItems);
    //     cartData[itemId][size] = quantity;
    //     setCartItems(cartData)
    //     if (token) {
    //         try {
    //             await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
    //         } catch (error) {
    //             console.log(error)
    //             toast.error(error.message)
    //         }
    //         finally{
    //             setIsLoading(false)
    //         }
    //     }

    // }


    // const updateQuantity = async (itemId, size, quantity) => {
    //     setIsLoading(true);
    
    //     // Clone the current cart
    //     let cartData = structuredClone(cartItems);
    
    //     // Ensure the itemId key exists
    //     if (!cartData[itemId]) {
    //         cartData[itemId] = {};
    //     }
    
    //     // Update the size key within itemId
    //     cartData[itemId][size] = quantity;
    
    //     // Update state
    //     setCartItems(cartData);
    
    //     // Sync with backend if a token exists
    //     if (token) {
    //         try {
    //             await axios.post(
    //                 backendUrl + '/api/cart/update',
    //                 { itemId, size, quantity },
    //                 { headers: { token } }
    //             );
    //         } catch (error) {
    //             console.error(error);
    //             toast.error(error.message);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    // };
    


    const updateQuantity = async (itemId, size, quantity) => {
  
        // Clone the current cart
        let cartData = structuredClone(cartItems);
    
        // Ensure the itemId key exists
        if (!cartData[itemId]) {
            cartData[itemId] = { productData: {}, sizes: {} };
        }
    
        // Ensure the sizes object exists for this itemId
        if (!cartData[itemId].sizes) {
            cartData[itemId].sizes = {};
        }
    
        // Update the size key within sizes
        cartData[itemId].sizes[size] = quantity;
    
        // Remove the size entry if quantity is zero to clean up the data
        if (quantity === 0) {
            delete cartData[itemId].sizes[size];
    
            // Remove the item entirely if no sizes remain
            if (Object.keys(cartData[itemId].sizes).length === 0) {
                delete cartData[itemId];
            }
        }
    
        // Update state
        setCartItems(cartData);
    
        // Sync with backend if a token exists
        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            } finally {
            }
        } 
    };
    
    // const getCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const items in cartItems) {
    //         let itemInfo = products.find((product) => product._id === items);
    //         for (const item in cartItems[items]) {
    //             try {
    //                 if (cartItems[items][item] > 0) {
    //                     totalAmount += itemInfo.price * cartItems[items][item];
    //                 }
    //             } catch (error) {

    //             }
    //         }
    //     }
    //     return totalAmount;
    // }



    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            const itemData = cartItems[itemId];
    
            // Extract product data and sizes
            const productData = itemData.productData;
            const sizes = itemData.sizes;
    
            if (!productData || !sizes) continue; // Skip if product data or sizes are missing
    
            for (const size in sizes) {
                const quantity = sizes[size];
                try {
                    if (quantity > 0) {
                        totalAmount += (productData.price_upper?.$numberInt || productData.price_upper) * quantity;
                    }
                } catch (error) {
                    console.error(`Error calculating total amount for item ${itemId}:`, error);
                }
            }
        }
    
        return totalAmount;
    };

    
    const getProductsData = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }


    // const getSearchResults = async (query) => {
    //     try {
    //         console.log("in getSearch Results")
    //         const response = await axios.get(backendUrl + `/api/product/results?query=${query}`)
    //         console.log(response.data)
    //         if (response.data.success) {
    //             setProducts(response.data)
    //             console.log("in setProducst")
    //             console.log(products)
    //         }
    //         else{
    //             toast.error(response.data.message)
    //         }
    //         console.log("out of setProducst")

    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.message)
    //     }
    // };
    

    const getSearchResults = async (query) => {
        setIsLoading(true)
        try {
            const source='amazon_search'
            const response = await axios.get(`${backendUrl}/api/product/results?query=${query}&source=${source}`);
            if (response.data.success) {
                const results = response.data.results;
                setProducts(results); // State update
                toast.success("Products updated successfully");
                return results
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
        finally{
            setIsLoading(false)
        }
    };

    const getSearchProduct = async (query) => {
        try {
            setIsLoading(true)
            console.log("in getSearchProduct ");
            const source='amazon_product'
            const response = await axios.get(`${backendUrl}/api/product/results?query=${query}&source=${source}`);
            console.log(response.data);
            if (response.data.success) {
                const results = response.data.results;
                console.log("Processing results:", results);
                setProductDetail(results); // State update
                // toast.success("Product details fetched");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // toast.error(error.message);
        }
        finally{
            setIsLoading(false)
        }
    };
    
    
    const getUserCart = async (token) => {
        try {       
            setIsLoading(true)
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
                console.log(' : in getUserCart')
                console.log(cartItems)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

   
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
        }
    }, [token])

    const value = {
        isLoading,setIsLoading,
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, 
        getSearchResults,getSearchProduct, productDetail, setProductDetail,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
