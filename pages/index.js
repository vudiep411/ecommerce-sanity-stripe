import React from 'react'
import { Product, FooterBanner, HeroBanner, Footer } from '../components'
import { client } from '../lib/client'

const Home = ({products, bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
        <div className='products-heading'>
          <h2>Best Seller</h2>
          <p>Item of the days</p>
        </div> 
        <div className='products-container'>
          {products?.map((p) => <Product key={p._id} product={p}/>)}
        </div>

        <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && bestSeller == true]'
  const products = await client.fetch(query)

  const queryBanner = '*[_type == "banner"]'
  const bannerData = await client.fetch(queryBanner)


  return {props: {products, bannerData}}
}

export default Home
