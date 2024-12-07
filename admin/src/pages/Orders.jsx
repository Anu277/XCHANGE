import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token, 'Cache-Control': 'no-cache' } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        
        setFilteredOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
         fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(backendUrl + `/api/order/delete/${orderId}`, { headers: { token } });
  
      if (response.data.success) {
        toast.success('Order deleted successfully');
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();

  }, [token]);

  useEffect(() => {
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const searchTermLower = searchTerm.toLowerCase();

      console.log(orders)

      return (
        (searchTerm === '' || 
         order.orderId.toLowerCase().includes(searchTermLower) ||
         order.items.some(item => item.name.toLowerCase().includes(searchTermLower)) ||
         order.address.firstName.toLowerCase().includes(searchTermLower) ||
         order.address.lastName.toLowerCase().includes(searchTermLower)) &&
        (!start || orderDate >= start) &&
        (!end || orderDate <= end)
      );
    });
    setFilteredOrders(filtered);
  }, [searchTerm, startDate, endDate, orders]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Order Page</h3>
      
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search by Order ID or Product Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <AnimatePresence>
        {filteredOrders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg shadow-md"
          >
            <img className="w-12" src={assets.parcel_icon} alt="Parcel icon" />
            <div>
              <p className="font-bold">Order ID: {order.orderId}</p>
              <div>
                {order.items.map((item, index) => (<p className='py-2'>
                  <span key={index} className=" text-gray-900">
                    {item.title}
                    </span>
                       <span className='text-red-600 text-lg underline rounded-md p-1'>{ " x" + item.quantity}
                    </span>
                  </p>
                ))}
              </div>
              <div>
                <p className="mt-3 mb-2 font-medium border-t border-black">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
                
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <div className="flex flex-col space-y-2">
              <select 
                onChange={(event) => statusHandler(event, order._id)} 
                value={order.status} 
                className="p-2 font-semibold bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteOrder(order._id)}
                className="bg-red-500 text-white p-2 rounded mt-3 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Orders;

