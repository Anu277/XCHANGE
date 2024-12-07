import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch, getSearchResults, setIsLoading} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (search.trim()) {
        getSearchResults(search);
      }
    };
    
  return showSearch && visible ? (
    <div className='border-t border-b border-gray-950 bg-gray-700 text-center'>
      <form  onSubmit={handleSearch}>
        <div className='inline-flex items-center justify-center border border-gray-500 px-5 pr-2 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} className='text-white flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
          {/* <img className='w-4 invert' src={assets.search_icon} alt="" /> */}
          <button
          type="submit"
          className="hidden sm:block mx-1 px-4 py-2 bg-blue-500 text-white rounded-full  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer invert ' src={assets.cross_icon} alt="" />
      </form>
    </div>
  ) : null
}

export default SearchBar
