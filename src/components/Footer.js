import React from 'react'
// import Logo from './Logo'
import '../css/footer.css'
// import {
//     Link
// } from 'react-router-dom'



const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Phần liên hệ */}
                <div className="footer-contact">
                    <a href='https://www.facebook.com/trinhhau1211' target="_blank" rel="noopener noreferrer">
                        <div className="footer-contact-content">Trịnh Đoàn Hậu ☻</div>
                    </a>
                    <p>Email: <a href="mailto:2151053017hau@ou.edu.vn">2151053017hau@ou.edu.vn</a></p>
                    <p>Phone: <a href="tel:+84346469539">0346469539</a></p>
                </div>

                {/* Phần liên kết */}
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>

                {/* Phần mạng xã hội */}
                <div className="footer-social">
                    <a href="https://www.facebook.com/trinhhau1211" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                    <a href="https://www.linkedin.com/in/trinhhau" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="https://twitter.com/trinhhau" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                </div>
            </div>

            {/* Phần bản quyền */}
            <div className="footer-copyright">
                <p>&copy; 2024 Trịnh Đoàn Hậu. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;