import orderModel from "../models/orderModel.js";

// Function to generate the next order ID
export const getNextOrderId = async () => {
    try {
        // Format the current date as YYYYMMDD
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

        // Find today's orders (between midnight and 11:59:59 PM)
        const todayStart = new Date().setHours(0, 0, 0, 0);
        const todayEnd = new Date().setHours(23, 59, 59, 999);
        const todayOrders = await orderModel.find({
            date: { $gte: todayStart, $lte: todayEnd },
        });

        // Count today's orders and generate the next order number
        const nthOrder = String(todayOrders.length + 1).padStart(6, "0");

        // Combine into the final order ID
        return `ORD${currentDate}${nthOrder}`;
    } catch (error) {
        console.error("Error generating order ID:", error);
        throw new Error("Could not generate order ID");
    }
};
