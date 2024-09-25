import React, { useEffect } from 'react';
import '../css/intro.css';
import '../css/home.css';


const Home = () => {

    useEffect(() => {
        console.log(process.env.REACT_APP_URL_API);
        return () => {
            console.log("Intro");
        }
    }, [])

    return (
        <>
            <div className="home-content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-section">
                            <div className="heading-container">
                                <h4>Giải pháp Quản lý Tòa nhà Văn phòng</h4>
                                <h3>Hệ thống Quản lý Tòa nhà Phiên bản 1.0.1</h3>
                            </div>
                            <p>Chúng tôi cung cấp một hệ thống quản lý toàn diện cho các tòa nhà văn phòng, cho phép các quản trị viên dễ dàng quản lý các công ty thuê văn phòng, theo dõi thông tin về các mặt bằng thuê, quản lý các dịch vụ và đội ngũ nhân viên tòa nhà.</p>
                            <div className="button-container">
                                <a href="/contact" className="contact-button">
                                    Liên Hệ
                                    <span className="button-inner">
                                        <span className="button-blobs">
                                            <span className="button-blob"></span>
                                            <span className="button-blob"></span>
                                            <span className="button-blob"></span>
                                            <span className="button-blob"></span>
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 image-container">
                            <img 
                                alt="" 
                                className="responsive-image" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <div className="container">
                    <div className="info-grid">
                        <div className="info-card">
                            <a href="/floors">
                                <div className="info-content">
                                    <h3>Quản lý Mặt bằng Cho Thuê</h3>
                                    <p>Quản lý danh sách các tầng trong tòa nhà, thông tin mặt bằng đã thuê, và đăng ký hợp đồng mới.</p>
                                </div>
                            </a>
                        </div>
                        <div className="info-card highlight-card">
                            <a href="/company">
                                <div className="info-content">
                                    <h3>Quản lý Các Công ty Thuê Tại Tòa Nhà</h3>
                                    <p>Theo dõi và quản lý các công ty thuê mặt bằng trong tòa nhà và thông tin nhân viên của họ.</p>
                                </div>
                            </a>
                        </div>
                        <div className="info-card">
                            <a href="/service-management">
                                <div className="info-content">
                                    <h3>Quản lý Dịch vụ và Nhân viên Tòa Nhà</h3>
                                    <p>Quản lý dịch vụ cung cấp trong tòa nhà, theo dõi mức lương, và đội ngũ nhân viên.</p>
                                </div>
                            </a>
                        </div>
                        <div className="info-card highlight-card">
                            <a href="/monthly-fee-statistics">
                                <div className="info-content">
                                    <h3>Quản lý Doanh thu và Dịch vụ</h3>
                                    <p>Theo dõi và quản lý doanh thu từ việc cho thuê mặt bằng và dịch vụ được sử dụng.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        
        </>
    )
}

export default Home;
