import React from 'react'
import Link from 'next/link'


const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
      <h3>{heroBanner.midText}</h3>
      <h1>{heroBanner.largeText1}</h1>
      {/* <img src={urlFor(heroBanner.image)} alt="jersey" className='hero-banner-image'/> */}
      <div style={{marginTop: '100px'}}>
        <div className='desc'>
          <h5>Item</h5>
          <p>{heroBanner.desc}</p>
        </div>  
          <Link href={`/product/${heroBanner.product}`}>
            <button button='button'>{heroBanner.buttonText}</button>
          </Link> 
      </div>     
    </div>
  )
}

export default HeroBanner