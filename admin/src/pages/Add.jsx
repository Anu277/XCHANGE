import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("others");
  const [subcategory, setSubcategory] = useState("other");
  const [bestseller, setBestseller] = useState(false);

  const categories = [
    {
      "name": "",
      "subcategories": [
        
      ]
    },
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subcategory", subcategory)
      formData.append("bestseller", bestseller)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

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

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>

      </div>


      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add