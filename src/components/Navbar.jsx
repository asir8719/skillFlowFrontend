import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../store/auth'
import { ToastContainer } from 'react-toastify'
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const {isLoggedIn, LogoutUser} = useAuth()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    <div className='container'>
      <div className='div1'>AsirKhan</div>
        <div className='menu-icon' onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <ul>
            <li><NavLink to='/' onClick={toggleMenu}>Home</NavLink></li>
            <li><NavLink to='/about' onClick={toggleMenu}>About</NavLink></li>
            <li><NavLink to='/contact' onClick={toggleMenu}>Contact</NavLink></li>
            <a><li><NavLink to='/services' onClick={toggleMenu}>Services</NavLink></li></a>
            {isLoggedIn ? ( <li><NavLink to='/logout' onClick={() => {LogoutUser(); toggleMenu();}}>Log Out</NavLink></li> 
            ) : (<> <li><NavLink to='/login' onClick={toggleMenu}>Login</NavLink></li>
            <li><NavLink to='/signup' onClick={toggleMenu}>SignUp</NavLink></li>
            </>)}
              <li><NavLink to='/admin' onClick={toggleMenu}>Admin</NavLink></li>
            </ul>
        </nav>      
    </div>
    </>
  )
}

export default Navbar
