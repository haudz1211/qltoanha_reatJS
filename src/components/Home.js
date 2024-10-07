import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import các thành phần cần thiết từ Google Maps

import '../css/intro.css';
import '../css/home.css';


const Home = () => {

    useEffect(() => {
        console.log(process.env.REACT_APP_URL_API);
        return () => {
            console.log("Intro");
        }
    }, [])


    // Định nghĩa vị trí của bản đồ
    const mapContainerStyle = {
        width: '100 %',
        height: '400px', // Chiều cao của bản đồ
    };

    const center = {
        lat: 10.6754047, // Vĩ độ của địa điểm
        lng: 106.6906695, // Kinh độ của địa điểm
    };

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
                                <a href="/" className="contact-button">
                                    Liên Hệ
                                    
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

            <div className="map-section">
                <h2 className="map-title">Địa điểm Trường Đại học Mở TP. Hồ Chí Minh trên bản đồ</h2>
                <div className="map-address-container">
                    <div className="map-container">
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={17}
                            >
                                <Marker position={center} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <div className="address-container">
                        <h3>Địa chỉ:</h3>
                        <p>Trường Đại học Mở TP. Hồ Chí Minh (Cơ sở 3)</p>
                        <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+M%E1%BB%9F+TP.+H%E1%BB%93+Ch%C3%AD+Minh+(c%C6%A1+s%E1%BB%9F+3)/@10.6754047,106.6880946,17z/data=!3m1!4b1!4m6!3m5!1s0x31753100099ce9ed:0xdb6079801f0735ea!8m2!3d10.6754047!4d106.6906695!16s%2Fg%2F11vb0y4b78?hl=vi-VN&entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D">
                        <p>Địa chỉ: Khu dân cư, Nhà Bè, Hồ Chí Minh, Việt Nam</p>
                        </a>
                    </div>
                </div>
            </div>

        
        
        </>
    )
}

export default Home;
