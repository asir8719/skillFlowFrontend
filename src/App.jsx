import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import './main.jsx'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Services from './components/Services'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import { Footerdiv } from './components/Footer'
import Error from './components/Error'
import { Logout } from './components/Logout.jsx'
import Admin from './components/Layouts/Admin-Layout.jsx'
import AdminContact from './components/Admin-Contact.jsx'
import AdminUser from './components/Admin-User.jsx'
import AdminServices from './components/Admin-Service.jsx'
import AdminUpdate from './components/Admin-Update.jsx'
import AdminServiceUpdate from './components/Admin-Service-Update.jsx'
import BackTop from './components/BackTop.jsx'
import { useEffect, useState } from 'react'
import Cart from './components/Cart.jsx'

function App() {

  const [isTop, setIsTop] = useState(true)
  useEffect(() =>{
    const handleScroll = () => {
      if(window.scrollY > 300){
        setIsTop(false)
      } else{
        setIsTop(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/courses' element={<Services/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='*' element={<Error/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/admin' element={<Admin/>}>
            <Route path='' element={<AdminUser/>}/>
            <Route path='contact' element={<AdminContact/>}/>
            <Route path='services' element={<AdminServices/>}/>
            <Route path=':id/edit' element={<AdminUpdate/>}/>
            <Route path='services/:id/edit' element={<AdminServiceUpdate/>}/>
          </Route>
        </Routes>
        {isTop ? null : <BackTop/>}
        <Footerdiv/>
      </BrowserRouter>
    </>
  )
}

export default App

