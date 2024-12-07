
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"
import {fetchDataFromOxylabs} from '../utils/oxylabAmazonSearch.js'


// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subcategory, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            subcategory, // Add subcategory here
            price: Number(price),
            bestseller: bestseller === "true",
            image: imagesUrl,
            date: Date.now()
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//fucntion for resulted products

const resultProducts = async (req, res) => {
    const { query, source } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    console.log("In resultProducts with query:", query);
  
    try {
      const results = await fetchDataFromOxylabs(query, source);
      res.json({success:true, results });
    } catch (err) {
      console.error("Error in resultProducts:", err);
  
      // Distinguish between known and unknown errors
      res.status(500).json({
        error: "Failed to fetch data",
        details: typeof err === "string" ? err : err.message || "Unknown error",
      });
    }
  };
  


  
// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subcategory, bestseller } = req.body;

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const updatedData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(category && { category }),
            ...(subcategory && { subcategory }), // Add subcategory here
            ...(price && { price: Number(price) }),
            ...(bestseller && { bestseller: bestseller === "true" }),
        };

        if (imagesUrl.length) {
            updatedData.image = imagesUrl;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({ success: true, message: "Product Updated", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export { listProducts, resultProducts, addProduct, updateProduct, removeProduct, singleProduct }