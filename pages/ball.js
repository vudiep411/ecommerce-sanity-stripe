import React from 'react'
import { client } from '../lib/client'
import { Product } from '../components'

const ball = ({productBalls}) => {
  return (
    <>
        <div className='products-heading'>
          <h2>Balls</h2>
          <p>Explore Balls Collections</p>
        </div> 
        <div className='products-container'>
          {productBalls?.map((p) => <Product key={p._id} product={p}/>)}
        </div>
    </>
  )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product" && type == "ball"]'
    const productBalls = await client.fetch(query)

    return {props: {productBalls}}
}
export default ball