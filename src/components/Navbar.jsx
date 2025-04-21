import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { ToastContainer } from 'react-toastify';
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import { BsCart2 } from "react-icons/bs";
import LightMode from './LightMode.jsx';

const Navbar = () => {
  const { isLoggedIn, LogoutUser, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref2 = useRef();
  const [isMobile, setIsMobile] = useState(false); // State to track screen size
  const lastScroll = useRef(0); // Ref to track last scroll position
  
  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980); // Set to true for screens <= 768px
    };
    
    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize); // Add resize listener
    
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, []);
  
  const toggleMenu = () => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Apply GSAP animations only for mobile screens
      if (isOpen) {
        gsap.to(ref2.current, {
          duration: 0.3,
          opacity: 0,
          y: -500,
          onComplete: () => setIsOpen(false),
        });
      } else {
        setIsOpen(true);
        gsap.to(ref2.current, {
          duration: 0.5,
          opacity: 1,
          y: 0,
        });
      }
    } else {
      // For full-screen, just toggle the state without animations
      setIsOpen(!isOpen);
    }
  })
  return () => ctx.revert()
  };
  
  useEffect(() => {
    const ctx2 = gsap.context(() => {
      window.addEventListener('scroll', () => {
        const currentScroll = scrollY
        if(currentScroll > lastScroll.current) {
          gsap.to('.container', {
            duration: 0.4,
            opacity: 0,
            y: -100,
          });
        } else{
          gsap.to('.container', {
            duration: .4,
            opacity: 1,
            y: 0,
          })
        }
        lastScroll.current = currentScroll
      })
    })
    return () => ctx2.revert()
  }, [])

  const navigate = useNavigate();
  const gotoCart = () => {
    navigate('/cart')
  }

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
      <div className="container">
        <div className='div1'><img src="./logo.png" alt="" /></div>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav
          ref={ref2}
          className={`nav-menu ${isOpen ? 'active' : ''} ${
            isMobile ? 'mobile' : 'desktop'
          }`}
        >
          <ul>
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={toggleMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={toggleMenu}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" onClick={toggleMenu}>
                Courses
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  onClick={() => {
                    LogoutUser();
                    toggleMenu();
                  }}
                >
                  Log Out
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={toggleMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={toggleMenu}>
                    SignUp
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin === "true" && (
              <li>
              <NavLink to="/admin" onClick={toggleMenu}>
                Admin
              </NavLink>
            </li>
            )}
          </ul>
        </nav>
      <div style={{display:'flex', columnGap:'.9rem'}}><LightMode/>
      <div onClick={gotoCart} style={{display:'flex', alignItems:'center', gap:'.5rem', cursor:'pointer'}}><BsCart2 id='cart'/>Cart</div>
      </div>
      </div>
    </>
  );
};

export default Navbar;
