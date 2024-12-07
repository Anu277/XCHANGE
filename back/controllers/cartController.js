import userModel from "../models/userModel.js"


// add products to user cart


// const addToCart = async (req,res) => {
//     try {
        
//         const { userId, itemId, size, productData } = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         if (cartData[itemId]) {
//             cartData[itemId][productData]=productData;
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1
//             }
//             else {
//                 cartData[itemId][size] = 1
//             }
//         } else {
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1
//         }
//         console.log("cartData")
//         console.log(cartData)

//         await userModel.findByIdAndUpdate(userId, {cartData})

//         res.json({ success: true, message: "Added To Cart" })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, productData } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Ensure itemId exists in cartData
        if (!cartData[itemId]) {
            cartData[itemId] = { productData, sizes: {} };
        }

        // Update sizes and quantities
        if (cartData[itemId].sizes[size]) {
            cartData[itemId].sizes[size] += 1;
        } else {
            cartData[itemId].sizes[size] = 1;
        }

        // Save updated cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Added To Cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// update user cart
// const updateCart = async (req,res) => {
//     try {
        
//         const { userId ,itemId, size, quantity } = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         cartData[itemId][size] = quantity

//         await userModel.findByIdAndUpdate(userId, {cartData})
//         res.json({ success: true, message: "Cart Updated" })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Fetch the user's cart data
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Initialize the item if it doesn't exist
        if (!cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Update the quantity in the sizes object
        if (quantity > 0) {
            cartData[itemId].sizes[size] = quantity;
        } else {
            // Remove the size entry if quantity is 0
            delete cartData[itemId].sizes[size];

            // Remove the item entirely if no sizes remain
            if (Object.keys(cartData[itemId].sizes).length === 0) {
                delete cartData[itemId];
            }
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated successfully", cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// get user cart data
const getUserCart = async (req,res) => {

    try {
        
        const { userId } = req.body
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }