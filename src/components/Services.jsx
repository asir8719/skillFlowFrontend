import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'
import { TbShoppingBag } from "react-icons/tb";
import gsap from 'gsap'
import SearchFilter from './SearchFilter';


const Services = () => {
    const [services, setServices] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [sortOption, setSortOption] = useState('')
    const {API, addToCart, cartItems, setServi, isLoggedIn, handlePayment, setSortedServices, sortedServices} = useAuth()

  const fetchServiceData = async() =>{
    try {
      const response = await fetch(`${API}/services`, {
        method: 'GET',
      })
      const data = await response.json()
      if(response.ok){
        const {msg: serviceData} = data
        setServices(serviceData)
        setSortedServices(serviceData)
        setRefresh(!refresh)
        setServi(serviceData)
      } else{
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() =>{
    fetchServiceData()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {duration: .3, delay:0}})
      tl.from('.srvch1', {y: 50, opacity: 0})
      tl.from('.srvcdv1', {y: 50, opacity: 0})
      tl.from('.srvcdv2', {y: 50, opacity: 0})
    })
    return () => ctx.revert()
  }, [])

  const handleSort = (option) => {
    setSortOption(option)
    let sortedData = [...services]
    if(option === 'low') {
      sortedData.sort((a, b) => a.price - b.price)
    } else if(option === 'high') {
      sortedData.sort((a, b) => b.price - a.price)
    } else if(option === 'a-z') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name))
    } else if(option === 'z-a') {
      sortedData.sort((a, b) => b.name.localeCompare(a.name))
    } else if(option === '') {
      sortedData = services
    }
    setSortedServices(sortedData);
  }
  
  return (<>
    <h1 style={{fontSize:"4.1rem", marginTop:"2rem"}} className='srvch1'>Our <span style={{color:'#6e96cf'}}>Courses</span></h1>
    <div style={{marginLeft:'4rem'}}>
      <p style={{fontSize:"3.7rem", marginTop:"1rem"}}>We are not a <span style={{color:'#24cfa6'}}>Course <p>Factory.</p></span></p>
      <p style={{fontSize:"2.2rem"}}>We focus on courses that really help.</p>
    </div>
      <div style={{marginLeft:'1.5rem', marginTop:'2rem', display:'flex', gap:'2rem', alignItems:'center'}}>
        <select name="sort" id="sort" value={sortOption} onChange={(e) => handleSort(e.target.value)}>
          <option defaultChecked value="">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="a-z">Name: a-z</option>
          <option value="z-a">Name: z-a</option>
        </select>
        <SearchFilter sortedData={services} />
      </div>
    <div className='srvcdv1'>
      {sortedServices.map((srvc) => {  
        return (
          <div style={{borderRadius:'15px'}} className="srvcdv2" key={srvc._id}>
          <img style={{objectFit:'cover',width:'auto', height:'194px'}} src={srvc.image} alt="image" />
          <div style={{padding:'1rem'}}>
            <h1>{srvc.name}</h1>
            <p>{srvc.description}</p>
            <span style={{display:'flex', justifyContent:'left', alignItems:'center', gap:'1.4rem'}}>
                <p style={{color:'#1cdd00'}}>Price: ₹{srvc.price}</p>
                <p style={{textDecoration:'line-through'}}>Price: ₹199</p>
            </span>
            {
              isLoggedIn ? <button onClick={() => handlePayment(srvc.price)}>Buy Now</button> : <button onClick={() => toast.error('Please login to buy this service')}>Buy Now</button>
            }
            {
              isLoggedIn ? (<button onClick={() => addToCart(srvc)} style={{marginLeft:'1rem'}}>{cartItems.some((cartItem) => cartItem.id === srvc.id) ? 'Added' : 'Add to Cart'} <TbShoppingBag/></button>) : null
            }
          </div>
        </div>
);
})}
    </div>
  </>
  )
}

export default Services
