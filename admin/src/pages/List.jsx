// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'

// const List = ({ token }) => {

//   const [list, setList] = useState([])
//   const [editProduct, setEditProduct] = useState(null);

//   const fetchList = async () => {
//     try {

//       const response = await axios.get(backendUrl + '/api/product/list')
//       if (response.data.success) {
//         setList(response.data.products.reverse());
//       }
//       else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const removeProduct = async (id) => {
//     try {

//       const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList();
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>

//         {/* ------- List Table Title ---------- */}

//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* ------ Product List ------ */}

//         {
//           list.map((item, index) => (
//             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//               <img className='w-12' src={item.image[0]} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//               <p onClick={() => setEditProduct(item)} className="text-right md:text-center cursor-pointer text-lg text-blue-500">Edit</p>
//             </div>
//           ))
//         }

//       </div>
//     </>
//   )
// }

// export default List




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const [editProduct, setEditProduct] = useState(null);
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`);
//       if (response.data.success) {
//         setList(response.data.products.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const saveProduct = async () => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/update`,
//         {
//           id: editProduct._id,
//           name,
//           price,
//           category,
//         },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         fetchList();
//         setEditProduct(null); // Reset the edit form
//         setName('');
//         setPrice('');
//         setCategory('');
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   useEffect(() => {
//     if (editProduct) {
//       // Pre-fill the form when editing
//       setName(editProduct.name);
//       setPrice(editProduct.price);
//       setCategory(editProduct.category);
//     }
//   }, [editProduct]);

//   return (
//     <>
//       <p className="mb-2">All Products List</p>
//       <div className="flex flex-col gap-2">

//         {/* Edit Form */}
//         {editProduct && (
//           <div className="p-4 border bg-gray-100 rounded-md">
//             <h3 className="mb-2 font-bold">Edit Product</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <button
//               onClick={saveProduct}
//               className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditProduct(null)}
//               className="bg-gray-500 text-white py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* Product List */}
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className="text-center">Action</b>
//         </div>

//         {list.map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
//             key={index}
//           >
//             <img className="w-12" src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>
//               {currency}
//               {item.price}
//             </p>
//             <p
//               onClick={() => removeProduct(item._id)}
//               className="text-right md:text-center cursor-pointer text-lg"
//             >
//               X
//             </p>
//             <p
//               onClick={() => setEditProduct(item)}
//               className="text-right md:text-center cursor-pointer text-lg text-blue-500"
//             >
//               Edit
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;











import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { backendUrl, currency } from '../App'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState("other");
  const [description, setDescription] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    {
      "name": "Computers & Laptops",
      "subcategories": [
        "Desktops",
        "Laptops",
        "Workstations",
        "Mini PCs",
        "2-in-1 Devices",
        "Gaming PCs & Laptops"
      ]
    },
    {
      "name": "Networking & Connectivity",
      "subcategories": [
        "Routers & Modems",
        "Network Switches",
        "Wi-Fi Extenders & Mesh Systems",
        "Cables & Adapters",
        "Wireless Network Cards",
        "Network Security (Firewalls, VPNs)"
      ]
    },
    {
      "name": "Storage & Data Management",
      "subcategories": [
        "External Hard Drives",
        "Solid State Drives (SSDs)",
        "Network Attached Storage (NAS)",
        "USB Flash Drives",
        "Cloud Storage Solutions",
        "RAID Arrays"
      ]
    },
    {
      "name": "Peripherals & Accessories",
      "subcategories": [
        "Keyboards",
        "Mice & Trackpads",
        "Monitors & Displays",
        "Docking Stations",
        "External Speakers & Headphones",
        "Webcams",
        "Printers & Scanners",
        "PC Cases & Cooling Systems"
      ]
    },
    {
      "name": "Software & Licenses",
      "subcategories": [
        "Operating Systems",
        "Productivity Software (Microsoft Office, Google Workspace)",
        "Security Software (Antivirus, Firewalls)",
        "Design & Creative Software (Adobe Creative Suite, etc.)",
        "Developer Tools & IDEs",
        "Data Backup & Recovery Software",
        "Business Solutions (CRM, ERP)"
      ]
    },
    {
      "name": "Mobile Devices",
      "subcategories": [
        "Smartphones",
        "Tablets",
        "Smartwatches",
        "Phone Accessories (Cases, Chargers, Screen Protectors)"
      ]
    },
    {
      "name": "Smart Home & IoT",
      "subcategories": [
        "Smart Speakers (Alexa, Google Home)",
        "Smart Lighting",
        "Smart Plugs & Switches",
        "Home Security Systems (Cameras, Alarms)",
        "Smart Thermostats",
        "IoT Sensors & Gadgets"
      ]
    },
    {
      "name": "Gaming Gear",
      "subcategories": [
        "Gaming Consoles (PlayStation, Xbox, Nintendo)",
        "Gaming Keyboards & Mice",
        "Headsets & Controllers",
        "Virtual Reality (VR) Headsets",
        "Gaming Monitors",
        "Gamepads & Joysticks"
      ]
    },
    {
      "name": "Business & Office IT",
      "subcategories": [
        "Printers & Scanners",
        "Projectors & Presentation Tools",
        "Conference Room Equipment",
        "POS (Point of Sale) Systems",
        "Collaboration Tools (Video Conferencing, Digital Whiteboards)"
      ]
    },
    {
      "name": "Data Center & Server Products",
      "subcategories": [
        "Servers (Rackmount, Tower)",
        "Server Accessories",
        "UPS (Uninterruptible Power Supply)",
        "Server Cooling Solutions",
        "Data Center Racks & Enclosures",
        "Cloud Servers"
      ]
    },
    {
      "name": "Computer Components & Upgrades",
      "subcategories": [
        "CPUs (Processors)",
        "Graphics Cards (GPUs)",
        "Motherboards",
        "Memory (RAM)",
        "Power Supplies",
        "Cooling Fans & Systems",
        "PC Cases & Modding Kits",
        "Hard Drives & SSDs"
      ]
    },
    {
      "name": "Tech Gadgets & Wearables",
      "subcategories": [
        "Smartwatches",
        "Fitness Trackers",
        "Wireless Earbuds & Headphones",
        "Drones",
        "Augmented Reality (AR) Glasses",
        "Portable Power Banks",
        "Bluetooth Speakers"
      ]
    },
    {
      "name": "Security & Surveillance",
      "subcategories": [
        "CCTV Cameras & Security Systems",
        "Smart Door Locks",
        "Surveillance Software",
        "Access Control Systems",
        "Alarm Systems"
      ]
    },
    {
      "name": "VR/AR & 3D Tech",
      "subcategories": [
        "Virtual Reality (VR) Headsets",
        "Augmented Reality (AR) Glasses",
        "3D Printers",
        "3D Scanners",
        "VR/AR Accessories"
      ]
    },
    {
      "name": "Cloud & Virtualization",
      "subcategories": [
        "Cloud Hosting & Services",
        "Virtualization Software",
        "Containers (Docker, Kubernetes)",
        "Cloud Storage Solutions (Google Drive, Dropbox, OneDrive)"
      ]
    },
    {
      "name": "AI & Robotics",
      "subcategories": [
        "AI Development Kits",
        "Robotic Kits",
        "AI Software & Algorithms",
        "Machine Learning Tools",
        "Robotics Accessories"
      ]
    }
  ]

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(""); // Reset subcategory on category change
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const currentSubcategories = categories.find((cat) => cat.name === category)?.subcategories || [];

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const saveProduct = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        {
          id: editProduct._id,
          name,
          price,
          category,
          subcategory, // Add subcategory here
          description,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
        setIsModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const openModal = (product) => {
    setEditProduct(product);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description || '');
    setSubcategory(product.subcategory || ''); // Include subcategory
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className=" mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">All Products List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {list.map((item) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-b"
                  >
                    <td className="p-2">
                      <img className="w-12 h-12 object-cover rounded" src={item.image[0]} alt={item.name} />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{currency}{item.price}</td>
                    <td className="p-2 mx-6 text-center flex">
                      <button
                        onClick={() => removeProduct(item._id)}
                        className="text-white hover:text-slate-400 mr-2 bg-rose-600 p-2 rounded-lg"
                        aria-label={`Delete ${item.name}`}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openModal(item)}
                        className="text-white hover:text-slate-400 mr-2 bg-blue-600 p-2 rounded-lg"
                        aria-label={`Edit ${item.name}`}
                      >
                        Edit
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <p>Product Name</p>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <p>Product Price</p>

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />

            <div>
              <p className="mb-2">Product Category</p>
              {/* Category Dropdown */}
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 mb-4"
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((category, index) => (
                  <option value={category.name} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* subcategory Dropdown */}
              {currentSubcategories.length > 0 && (
                <>
                  <p className="mb-2">Product subcategory</p>
                  <select
                    value={subcategory}
                    onChange={handleSubcategoryChange}
                    className="w-full px-3 py-2"
                  >
                    <option value="" disabled>
                      Select a subcategory
                    </option>
                    {currentSubcategories.map((subcategory, index) => (
                      <option value={subcategory} key={index}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <p>Product Description</p>

            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={saveProduct}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default List