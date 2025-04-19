import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footerdiv = () => {
    return(<>
    <div>
        <div className='ftrdiv' style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around', padding:'4rem 6rem'}}>
            <div>
                <img style={{width:'200px'}} src="./logo.png" alt="" />
            </div>
            <nav>
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/courses">Courses</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
            </nav>
            <nav>
                <h4>Legal</h4>
                <ul>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Terms of use</a></li>
                    <li><a href="">Refund & Cancellation Policy</a></li>
                </ul>
            </nav>
            <nav>
                <h4>Follow Us</h4>
                <ul style={{ display: 'flex', gap: '1rem' }}>
                    <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                    <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                    <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
                </ul>
            </nav>
        </div>
        <div>
            <div className='ftrbtn'>@Skill Flow 2024</div>
        </div>
    </div>
    </>)
}

export {Footerdiv}
// export default Footer