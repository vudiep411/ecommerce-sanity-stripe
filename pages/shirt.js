import React from 'react'
import { client } from '../lib/client'
import { Product } from '../components'

const shirt = ({productShirts}) => {
  return (
    <>
        <div className='products-heading'>
          <h2>Shirts</h2>
          <p>Explore Jerseys Collections</p>
        </div> 
        <div className='products-container'>
          {productShirts?.map((p) => <Product key={p._id} product={p}/>)}
        </div>
    </>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "product" && type == "shirt"]'
  const productShirts = await client.fetch(query)

  return {props: {productShirts}}
}
export default shirt