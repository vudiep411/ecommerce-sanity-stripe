import React, {useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill} from 'react-icons/bs'

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';


const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
    useEffect(() => {
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantity(0)
        runFireworks()
    }, [])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for shopping with us</h2>
            <p className='email-msg'>Receipt has been sent to your email</p>
            <p className='description'>
                For questions please email
                <a className='email' href="mailto:vudiep411@gmail.com">vudiep411@gmail.com</a>
            </p>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>Continue Shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default Success