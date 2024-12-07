import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['orderId'] = order.orderId
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  console.log(orderData)

  return (
    <div className={'border-t p-16'}>

        <div className='text-2xl'>
            <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div className={`${orderData.length<1?'':'min-h-svh'}`}>
            { 
              orderData.length<1?
              (
                <div className=' m-auto  flex justify-center align-middle items-center flex-col gap-10 min-h-dvh'>
                  <p className='text-4xl text-gray-400'>No recent orders</p>
                  <a href='/collection' className='underline cursor-pointer text-black'>
                    Browse products
                  </a>
                </div>
              ) 
              :
              // (orderData.map((item,index) => (
              //   <div key={index} className='border-b-gray-400 py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              //       <div className='flex items-start gap-6 text-sm'>
              //           <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              //           <div>
              //           <p className='pb-2 font-bold text-black'>Order ID: {item.orderId}</p>
              //             <p className='sm:text-base font-medium'>
              //               {item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name}
              //             </p>
              //             <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
              //               <p>{currency}{item.price}</p>
              //               <p>Quantity: {item.quantity}</p>
              //             </div>
              //             <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
              //             <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
              //           </div>
              //       </div>
              //       <div className='md:w-1/2 flex justify-between'>
              //           <div className='flex items-center gap-2'>
              //               <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
              //               <p className='text-sm md:text-base'>{item.status}</p>
              //           </div>
              //           <button onClick={loadOrderData} className='border border-black px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              //       </div>
              //   </div>
              // )))
              (orderData.map((item, index) =>
                (
                
                <div
                  key={index}
                  className="border-b-gray-400 py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      className="w-16 sm:w-20"
                      src={item.url_image || item.images[0]} // Updated to match the provided data
                      alt={item.title} // Use `title` for accessibility
                    />
                    <div>
                      <p className="pb-2 font-bold text-black">Order ID: {item.orderId}</p>
                      <p className="sm:text-base font-medium">
                        {item.title.length > 15
                          ? item.title.substring(0, 15) + "..."
                          : item.title} {/* Updated to use `title` */}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-base text-gray-600">
                        <p>
                          {item.currency} {item.price_upper}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <p className="mt-1">
                        Date:{" "}
                        <span className=" text-gray-900">
                          {new Date(item.date).toDateString()}
                        </span>
                      </p>
                      <p className="mt-1">
                        Payment: <span className=" text-gray-900">{item.paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className={`min-w-2 h-2 rounded-full bg-green-500`}></p>
                      <p className="text-sm md:text-base">{item.status}</p>
                    </div>
                    <button
                      onClick={loadOrderData}
                      className="border border-black px-4 py-2 text-sm font-medium rounded-sm"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              )
            

            ))
              
            }
        </div>
    </div>
  )
}

export default Orders
