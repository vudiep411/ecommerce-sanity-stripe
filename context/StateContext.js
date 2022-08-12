import React, {createContext, useContext, useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
 
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prev) => prev + product.price * quantity)
        setTotalQuantity((prev) => prev + quantity)

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((p) => {
                if(p._id === product._id) 
                    return {...p, quantity: p.quantity + quantity}
                return p
            })

            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
        setQty(1)
        toast.success(`${qty} ${product.name} added`)

    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc')
        {         
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prev) => prev + foundProduct.price)
            setTotalQuantity(prev => prev + 1)
        }
        else if(value === 'dec')
        {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
                setTotalPrice((prev) => prev - foundProduct.price)
                setTotalQuantity(prev => prev - 1)
            }
        }
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantity(prev => prev - foundProduct.quantity);
        setCartItems(newCartItems)
    }

    const incQty = () => {
        setQty((prev) => prev + 1)
    }
    const decQty = () => {
        setQty((prev) => {
            if(prev === 0) 
                return 0
            return prev - 1})
    }
    return (
        <Context.Provider value={{
            showCart, cartItems, totalPrice, 
            totalQuantity, qty, incQty, decQty,
            onAdd, setShowCart, toggleCartItemQuantity,
            onRemove, setCartItems, setTotalPrice, setTotalQuantity
        }}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context);