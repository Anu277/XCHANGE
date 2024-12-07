
// import nodemailer from 'nodemailer';
// import Stripe from 'stripe';
// import razorpay from 'razorpay';
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import { getNextOrderId } from '../utils/orderIdGenerator.js';
// import generateQuotationPDF from '../utils/pdfGenerator.js'
// import productModel from '../models/productModel.js';


// // Global Variables
// const currency = 'inr';
// const deliveryCharge = 10;

// // Payment Gateway Initialization
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Nodemailer Configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure:false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass:  process.env.EMAIL_PASS,
//     },
// });

// // Helper: Send Email Notifications
// const sendMail = async (to, subject, html) => {
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         html,
//     });
// };

// const sendOrderEmails = async (user, order, address) => {
//     console.log(order)
//     try {
//         const adminEmail = process.env.EMAIL_ADMIN;
//         const logoUrl = 'https://xchangetechs.s3.ap-south-1.amazonaws.com/xchange-tech-v9/assets/img/xchange-techs.png'; // Replace with actual logo URL

//         // Function to format the delivery address
//         const formatAddress = (address) => `
//             ${address.firstName} ${address.lastName}<br>
//             ${address.street},<br>
//             ${address.city}, ${address.state}, ${address.zipcode},<br>
//             ${address.country}<br>
//             Phone: ${address.phone}<br>
//             Email: ${address.email}
//         `;

//         // Define HTML styles and structure for the email
//         const generateEmailHTML = (name, order, recipientType) => {
//             const greeting = recipientType === "user" ? `Hello ${name},` : `Hello Admin,`;
//             const intro = recipientType === "user"
//                 ? "Thank you for shopping with us! Below are your order details."
//                 : "A new order has been placed. Here are the details.";
            
//             return `
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>XCHANGETECHS Order Confirmation</title>
//                 </head>
//                 <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;  margin: 0 auto; padding: 20px;">
                    
//                     <table cellpadding="0" cellspacing="0" border="0" width="100%">
//                         <tr>
//                             <td align="center" style="padding: 20px 0;">
//                                 <img src="${logoUrl}" alt="XCHANGETECHS Logo" style="max-width: 200px; height: auto;">
//                             </td>
//                         </tr>
//                         <tr>
//                             <td style="background-color: #f8f8f8; padding: 10px; border-radius: 8px;">
//                                 <h2 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">Order Confirmation</h2>
//                                 <p style="margin-bottom: 15px;">${greeting}</p>
//                                 <p style="margin-bottom: 20px;">${intro}</p>
//                                 <p >Order ID: <span style='font-weight:bold'> ${order.orderId}</sapn></p>
//                                 <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
//                                     <thead>
//                                         <tr>
//                                             <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 10px; background-color: #e9e9e9;">Item</th>
//                                             <th style="text-align: center; border-bottom: 2px solid #ddd; padding: 10px; background-color: #e9e9e9;">Quantity</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         ${order.items
//                                             .map(
//                                                 (item) => `
//                                                 <tr>
//                                                     <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name || item.title}</td>
//                                                     <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
//                                                 </tr>
//                                             `
//                                             )
//                                             .join("")}
//                                     </tbody>
//                                 </table>
//                                 <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
//                                     <h3 style="color: #4CAF50; margin-top: 0;">Delivery Address:</h3>
//                                     <p style="margin-bottom: 0;">${formatAddress(address)}</p>
//                                 </div>
//                                 <p style="margin-top: 20px; text-align: center;">Thank you for choosing XCHANGETECHS!</p>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td style="text-align: center; padding-top: 20px; color: #888; font-size: 12px;">
//                                 <p>This is an automated email. Please do not reply to this message.</p>
//                                 <p>&copy; ${new Date().getFullYear()} XCHANGETECHS. All rights reserved.</p>
//                             </td>
//                         </tr>
//                     </table>
//                 </body>
//                 </html>
//             `;
//         };

//         // Email to the user
//         const userHTML = generateEmailHTML(address.firstName, order, "user");
//         await sendMail(address.email, "Order Confirmation", userHTML);

//         // Email to the admin
//         const adminHTML = generateEmailHTML("Admin", order, "admin");
//         await sendMail(adminEmail, "New Order Received", adminHTML);

//     } catch (error) {
//         console.error("Error sending order emails:", error.message);
//     }
// };



// // Order Handlers
//  const placeOrder = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;
        
//         console.log("in PLceorder : items")
//         console.log(items)
//         // Verify user existence
//         const user = await userModel.findById(userId);
//         if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
//         // Generate unique order ID for the day
//         const orderId = await getNextOrderId();

//         // Create and save the order
//         const newOrder = new orderModel({
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod: "COD", // Change if needed
//             payment: false,
//             date: Date.now(),
//             orderId,
//         });

//         await newOrder.save();

//         // Clear user's cart after placing the order
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // Optionally, send emails
//         await sendOrderEmails(user, {orderId, amount, items} , address);

//         generateQuotationPDF(newOrder,address)
        
//         res.status(201).json({
//             success: true,
//             message: "Order placed successfully",
//             orderId, // Send orderId to the client
//         });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;
//         const { origin } = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Stripe",
//             payment: false,
//             date: Date.now(),
//         };

//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const line_items = [
//             ...items.map(item => ({
//                 price_data: {
//                     currency,
//                     product_data: { name: item.name },
//                     unit_amount: item.price * 100,
//                 },
//                 quantity: item.quantity,
//             })),
//             {
//                 price_data: {
//                     currency,
//                     product_data: { name: 'Delivery Charges' },
//                     unit_amount: deliveryCharge * 100,
//                 },
//                 quantity: 1,
//             },
//         ];

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         });

//         res.json({ success: true, session_url: session.url });
//     } catch (error) {
//         console.error("Error placing Stripe order:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const verifyStripe = async (req, res) => {
//     try {
//         const { orderId, success, userId } = req.body;

//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             await userModel.findByIdAndUpdate(userId, { cartData: {} });
//             res.json({ success: true });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false });
//         }
//     } catch (error) {
//         console.error("Error verifying Stripe payment:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const placeOrderRazorpay = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Razorpay",
//             payment: false,
//             date: Date.now(),
//         };

//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const options = {
//             amount: amount * 100,
//             currency: currency.toUpperCase(),
//             receipt: newOrder._id.toString(),
//         };

//         razorpayInstance.orders.create(options, (error, order) => {
//             if (error) return res.status(500).json({ success: false, message: error.message });
//             res.json({ success: true, order });
//         });
//     } catch (error) {
//         console.error("Error placing Razorpay order:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const verifyRazorpay = async (req, res) => {
//     try {
//         const { userId, razorpay_order_id } = req.body;

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//             await userModel.findByIdAndUpdate(userId, { cartData: {} });
//             res.json({ success: true, message: "Payment Successful" });
//         } else {
//             res.json({ success: false, message: 'Payment Failed' });
//         }
//     } catch (error) {
//         console.error("Error verifying Razorpay payment:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Admin and User Helpers
// const allOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({});
//         console.log(orders)
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error("Error fetching all orders:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const userOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const orders = await orderModel.find({ userId });
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error("Error fetching user orders:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const updateStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
//         await orderModel.findByIdAndUpdate(orderId, { status });
//         res.json({ success: true, message: 'Status Updated' });
//     } catch (error) {
//         console.error("Error updating order status:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // In orderController.js
//  const deleteOrder = async (req, res) => {
//     try {
//       const { id } = req.params
//       // Find and delete the order by ID
//       const order = await orderModel.findByIdAndDelete(id)
  
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' })
//       }
  
//       return res.status(200).json({ message: 'Order deleted successfully' })
//     } catch (error) {
//       console.error(error)
//       return res.status(500).json({ message: 'Something went wrong' })
//     }
//   }
  

// export { verifyRazorpay, verifyStripe, deleteOrder, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }



import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import { getNextOrderId } from '../utils/orderIdGenerator.js';
import generateQuotationPDF from '../utils/pdfGenerator.js';
import fs from 'fs';


const hsnFilepath='./HSN_SAC.json'
// Global Variables
const currency = 'inr';
const deliveryCharge = 10;

// Payment Gateway Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Helper: Send Email Notifications
// const sendMail = async (to, subject, html, attachmentPath) => {
//     try {
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             html,
//             attachments: attachmentPath
//                 ? [
//                       {
//                           filename: 'Quotation.pdf',
//                           path: attachmentPath,
//                           contentType: 'application/pdf',
//                       },
//                   ]
//                 : [],
//         };
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to ${to}`);
//     } catch (error) {
//         console.error(`Failed to send email to ${to}:`, error.message);
//     }
// };

// Helper: Send Order Emails
// const sendOrderEmails = async (user, order, address) => {
//     console.log(order.items[0].category.ladder)
//     try {
//         const adminEmail = process.env.EMAIL_ADMIN;
//         const pdfPath = `invoices/quotation_${order.orderId}.pdf`;

//         // Generate PDF for the order
//         generateQuotationPDF(order, address, hsnFilepath);

//         const generateEmailHTML = (name, order, recipientType) => {
//             const greeting = recipientType === "user" ? `Hello ${name},` : `Hello Admin,`;
//             const intro = recipientType === "user"
//                 ? "Thank you for shopping with us! Below are your order details."
//                 : "A new order has been placed. Here are the details.";
//             return `
//                 <html>
//                 <body>
//                     <p>${greeting}</p>
//                     <p>${intro}</p>
//                     <p>Order ID: ${order.orderId}</p>
//                     <p>Total Amount: ₹${order.amount}</p>
//                 </body>
//                 </html>`;
//         };


//         const userHTML = generateEmailHTML(address.firstName, order, 'user');
//         await sendMail(address.email, "Order Confirmation", userHTML, pdfPath);

//         const adminHTML = generateEmailHTML("Admin", order, 'admin');
//         await sendMail(adminEmail, "New Order Received", adminHTML, pdfPath);

//         // Clean up the PDF after sending
//         fs.unlinkSync(pdfPath);
//     } catch (error) {
//         console.error("Error sending order emails:", error.message);
//     }
// };

const sendMail = async (to, subject, htmlContent, pdfBuffer, order) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: to,
        subject: subject,
        html: htmlContent,
        attachments: [
            {
                filename: `quotation.pdf`, // Now `order` is correctly passed here
                content: pdfBuffer,
                encoding: 'base64',
                contentType: 'application/pdf',
            },
        ],
    };

    // Send the email (use your preferred email sending method, e.g., nodemailer)
    await transporter.sendMail(mailOptions);
};
const sendOrderEmails = async (user, order, address) => {
    try {
        const adminEmail = process.env.EMAIL_ADMIN;
        
        // Generate PDF for the order as a buffer
        const pdfBuffer = await generateQuotationPDF(order, address);

        const generateEmailHTML = (name, order, recipientType) => {
            const greeting = recipientType === "user" ? `Hello ${name},` : `Hello Admin,`;
            const intro = recipientType === "user"
                ? "Thank you for shopping with us! Below are your order details."
                : "A new order has been placed. Here are the details.";
            return ` 
                <html>
                <body>
                    <p>${greeting}</p>
                    <p>${intro}</p>
                    <p>Order ID: ${order.orderId}</p>
                    <p>Total Amount: ₹${order.amount}</p>
                </body>
                </html>`;
        };

        const userHTML = generateEmailHTML(address.firstName, order, 'user');
        await sendMail(address.email, "Order Confirmation", userHTML, pdfBuffer);

        const adminHTML = generateEmailHTML("Admin", order, 'admin');
        await sendMail(adminEmail, "New Order Received", adminHTML, pdfBuffer);
    } catch (error) {
        console.error("Error sending order emails:", error.message);
    }
};

// Order Handlers
 const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        
        // Verify user existence
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
        // Generate unique order ID for the day
        const orderId = await getNextOrderId();

        // Create and save the order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD", // Change if needed
            payment: false,
            date: Date.now(),
            orderId,
        });

        await newOrder.save();

        // Clear user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Optionally, send emails
        await sendOrderEmails(user, {orderId, amount, items} , address);

        generateQuotationPDF(newOrder,address)
        
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId, // Send orderId to the client
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = [
            ...items.map(item => ({
                price_data: {
                    currency,
                    product_data: { name: item.name },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            {
                price_data: {
                    currency,
                    product_data: { name: 'Delivery Charges' },
                    unit_amount: deliveryCharge * 100,
                },
                quantity: 1,
            },
        ];

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing Stripe order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body;

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.error("Error verifying Stripe payment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) return res.status(500).json({ success: false, message: error.message });
            res.json({ success: true, order });
        });
    } catch (error) {
        console.error("Error placing Razorpay order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin and User Helpers
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        console.log(orders)
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// In orderController.js
 const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params
      // Find and delete the order by ID
      const order = await orderModel.findByIdAndDelete(id)
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }
  
      return res.status(200).json({ message: 'Order deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
  

export { verifyRazorpay, verifyStripe, deleteOrder, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }