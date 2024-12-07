import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ProductCategories from '../components/ProductsCategories'

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <ProductCategories />
      <LatestCollection/>
      <BestSeller/>
      {/* <OurPolicy/> */}
      <NewsletterBox/>
    </div>
  )
}

export default Home
