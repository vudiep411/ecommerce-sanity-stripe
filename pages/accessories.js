import React from 'react'
import { client } from '../lib/client'
import { Product } from '../components'


const accessories = ({productAccessories}) => {
  return (
    <>
        <div className='products-heading'>
          <h2>Accessories</h2>
          <p>Explore accessories Collections</p>
        </div> 
        <div className='products-container'>
          {productAccessories?.map((p) => <Product key={p._id} product={p}/>)}
        </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && type == "accessories"]'
  const productAccessories = await client.fetch(query)

  return {props: {productAccessories}}
}
export default accessories