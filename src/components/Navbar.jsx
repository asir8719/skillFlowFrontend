import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../store/auth'
import { ToastContainer } from 'react-toastify'

const Navbar = () => {
  const {isLoggedIn, LogoutUser} = useAuth()

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
      <div>
        <nav>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            <a><li><NavLink to='/services'>Services</NavLink></li></a>
            {isLoggedIn ? ( <li><NavLink to='/logout' onClick={LogoutUser}>Log Out</NavLink></li> 
            ) : (<> <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/signup'>SignUp</NavLink></li>
            </>)}
              <li><NavLink to='/admin'>Admin</NavLink></li>
            </ul>
        </nav>
      </div>    
    </div>
    </>
  )
}

export default Navbar
