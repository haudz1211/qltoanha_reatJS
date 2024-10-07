import React from 'react';
import '../css/footer.css';

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
                    <p>Địa chỉ: 
                    <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+M%E1%BB%9F+TP.+H%E1%BB%93+Ch%C3%AD+Minh+(c%C6%A1+s%E1%BB%9F+3)/@10.6754047,106.6880946,17z/data=!3m1!4b1!4m6!3m5!1s0x31753100099ce9ed:0xdb6079801f0735ea!8m2!3d10.6754047!4d106.6906695!16s%2Fg%2F11vb0y4b78?hl=vi-VN&entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D">
                    Khu dân cư, Nhà Bè, Hồ Chí Minh, Việt Nam{/* Địa chỉ thêm vào */}   
                    </a></p> 
                </div>

                {/* Phần liên kết */}
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
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
