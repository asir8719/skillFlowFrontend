import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../store/auth';
import { ToastContainer } from 'react-toastify';
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref2 = useRef();
  const [isMobile, setIsMobile] = useState(false); // State to track screen size
  const { contextSafe } = useGSAP(); // Use GSAP context for animations

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set to true for screens <= 768px
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, []);

  const toggleMenu = contextSafe(() => {
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
  });

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
        <div className='div1'><img src="./WhatsAppLogo2.jpg" alt="" /></div>
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
              <NavLink to="/services" onClick={toggleMenu}>
                Services
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
            <li>
              <NavLink to="/admin" onClick={toggleMenu}>
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
