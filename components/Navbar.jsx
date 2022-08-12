import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import  Cart  from './Cart'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantity} = useStateContext()
  const [toggle, setToggle] = useState(false)
  const handleToggle = () => {
    if(toggle)
      setToggle(false)
    else
      setToggle(true)
  }
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'><b>Football Supply</b></Link>
      </p>
      <div className='mobile-container'>
        <a onClick={handleToggle} className='toggle-button'>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </a>
        {toggle && 
          <div className='links-mobile'>
            <p><Link href='/'>Football Supply</Link></p><hr/>
            <p><Link href='/accessories'>Accessories</Link></p><hr/>
            <p><Link href='/shirt'>Shirt</Link></p><hr/>
            <p><Link href='/ball'>Ball</Link></p>
          </div>  
        }
      </div>
      <div className='navbar-links'>
        <p className='logo'><Link href='/accessories'>Accessories</Link></p>
        <p className='logo'><Link href='/shirt'>Shirt</Link></p>
        <p className='logo'><Link href='/ball'>Ball</Link></p>
      </div>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantity}</span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar