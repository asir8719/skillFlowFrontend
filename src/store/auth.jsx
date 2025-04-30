import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [data, setData] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
    const API2 = 'https://ecommerces-m6g0.onrender.com'
    const API = 'http://localhost:3000'
    const [servi, setServi] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    const storeTokenInLS = (serverToken) =>{
        setIsLoggedIn(true)
        setToken(serverToken)
        localStorage.setItem('token', serverToken)
    }
    
    const LogoutUser = () =>{
        setToken('')
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        setIsAdmin(false)
        }
    
    const userAuthentication = async() => {
        try {
            const response = await fetch(`${API}/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.ok) {
                const userData = await response.json()
                setData(userData)
            } else{
                console.error('error fetching user data')
                setData('')
                setIsLoggedIn(false)
                localStorage.removeItem('token')
            }
        } catch (error) {
            console.error('error fetching user data')
        }
    }
    
    useEffect(() =>{
            userAuthentication()
    }, [isLoggedIn])
    
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || [],
    )

    
    const addToCart = (item) => {
        const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
        if(isInCart) {
            toast.warn('Item already in cart');
            return;
        } else {
            setCartItems((prevCartItems) => [...prevCartItems, item])
            toast.success('Item added to cart');
        }
    }
    
    const deleteCartItem = (id) => {
        const updateCartItems = cartItems.filter((item) => item.id !== id)
        console.log('updatedCartItems', updateCartItems);
        setCartItems(updateCartItems)
    }
    
    const handlePayment = (price) => {
        
        try {
          const script = document.createElement('script')
          script.src = "https://checkout.razorpay.com/v1/checkout.js"
          document.body.appendChild(script)
          script.onload = async () => {
            const response = await fetch(`${API}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: price * 100 }),
            })
            const data = await response.json()
            console.log(data);
            
            if(!data.id) {
                throw new Error('Order creation failed')
            }
            const options = {
                key: 'rzp_live_ph4vGtTtYQioe9',
                currency: data.currency,
                amount: data.amount,
                order_id: data.id,
                name: 'Ecommerce',
                description: 'Test Transaction',
                // image: 'https://example.com/your_logo',
                handler: async (response) => {
                    const verifyResponse = await fetch(`${API}/verify-payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    })
                    const verifyData = await verifyResponse.json()
                    if (verifyData.status === 'success') {
                        toast.success('Payment successful')
                        setCartItems([])
                    } else {
                        toast.error('Payment verification failed')
                    }
                },
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
          }
          script.onerror = () => {
            toast.error('Razorpay SDK failed to load. Are you online?')
          }

        } catch (error) {
          toast.error(error)
          return null
        }
      }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // console.log('cartItem price: ', cartItems.map((item) => item.price).reduce((acc, curr) => acc + curr, 0));
    }, [cartItems])
        
    return ( <AuthContext.Provider value={{handlePayment, storeTokenInLS, LogoutUser, isLoggedIn, data, token, API, API2, addToCart, cartItems, deleteCartItem, servi, setServi, setIsAdmin, isAdmin}}>
        {children}
    </AuthContext.Provider>
)}

export const useAuth = () =>{
    return useContext(AuthContext)
}
