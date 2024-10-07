import React, { useState, useEffect } from 'react';
import '../css/header.css';
import { Link, Navigate } from 'react-router-dom';

const Header = () => {
    const [isLogout, setIsLogout] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username')); // Lấy tên người dùng từ localStorage
    const [token, setToken] = useState(localStorage.getItem('token')); // Lấy token từ localStorage

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token'));
    }, [isLogout]);

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername(null); // Xóa username
        setToken(null); // Xóa token
        setIsLogout(true); // Thay đổi trạng thái đăng xuất
    };

    // Hàm hiển thị menu
    const showMenu = () => {
        const toggle = document.getElementById('header-toggle');
        const nav = document.getElementById('nav-menu');

        if (nav && toggle) {
            toggle.classList.toggle('bx-x'); // Đổi biểu tượng menu
            nav.classList.toggle('show'); // Hiện/ẩn menu
        }
    };

    // Hàm xử lý liên kết
    const linkAction = (id, status) => {
        const navLink = document.querySelectorAll('.nav__link');
        navLink.forEach(n => n.classList.remove('active'));
        if (id) {
            const _this = document.getElementById(id);
            _this.classList.add('active');
        }

        if (status === true) {
            const toggle = document.getElementById('header-toggle');
            const nav = document.getElementById('nav-menu');
            if (nav && toggle) {
                toggle.classList.remove('bx-x');
                nav.classList.remove('show');
            }
        }
    };

    // Điều kiện chuyển hướng đến trang đăng nhập nếu chưa có token
    const requireLogin = () => {
        if (!token) {
            setRedirectLogin(true);
        }
    };

    // Chuyển hướng nếu đã đăng xuất hoặc không có token
    if (isLogout || redirectLogin) {
        return <Navigate to='/login' replace={true} />;
    }

    return (
        <header className="header">
            <Link className="header__logo" to='/'>
                MANAGEMENTBUILDING.COM
            </Link>
            <i className="bx bx-menu header__toggle" id="header-toggle" onClick={showMenu} />

            <nav className="nav" id="nav-menu">
                <div className="nav__content bd-grid">
                    <Link className="nav__perfil" to='/' onClick={() => linkAction(null, true)}>
                        <div className="nav__name">
                            MANAGEMENTBUILDING.COM
                        </div>
                    </Link>
                    <div className="nav__menu">
                        <ul className="nav__list">
                            {/* Hiển thị menu dựa trên username */}
                            {username === 'admin' ? (
                                // Menu cho admin
                                <>
                                    <li className="nav__item dropdown">
                                        <div id="about" style={{ cursor: 'pointer' }} className="nav__link dropdown__link" onClick={() => linkAction('about', false)}>
                                            Quản lý tòa nhà
                                            <i className="bx bx-chevron-down dropdown__icon" />
                                        </div>
                                        <ul className="dropdown__menu">
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/company' onClick={requireLogin}>
                                                    Công ty
                                                </Link>
                                            </li>
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/floors' onClick={requireLogin}>
                                                    Mặt bằng
                                                </Link>
                                            </li>
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/monthly-fee-statistics' onClick={requireLogin}>
                                                    Tiền tháng này
                                                </Link>
                                            </li>
                                            
                                        </ul>
                                    </li>
                                    <li className="nav__item dropdown">
                                        <div id="service" style={{ cursor: 'pointer' }} className="nav__link dropdown__link" onClick={() => linkAction('service', false)}>
                                            Quản lý Dịch vụ
                                            <i className="bx bx-chevron-down dropdown__icon" />
                                        </div>
                                        <ul className="dropdown__menu">
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/service-registration/companies' onClick={requireLogin}>
                                                    Đăng ký dịch vụ
                                                </Link>
                                            </li>
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/service-management' onClick={requireLogin}>
                                                    Quản lý dịch vụ
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav__item dropdown">
                                        <div id="buildingemployee" style={{ cursor: 'pointer' }} className="nav__link dropdown__link" onClick={() => linkAction('buildingemployee', false)}>
                                            Quản lý nhân viên tòa nhà
                                            <i className="bx bx-chevron-down dropdown__icon" />
                                        </div>
                                        <ul className="dropdown__menu">
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/buildingemployee' onClick={requireLogin}>
                                                    Quản lý thông tin nhân viên
                                                </Link>
                                            </li>
                                            <li className="dropdown__item">
                                                <Link className="nav__link link__item" to='/work' onClick={requireLogin}>
                                                    Quản lý công việc
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) : username !== 'admin' ? (
                                // Menu cho user
                                <>
                                <li className="nav__item dropdown">
                                    <div id="about" style={{ cursor: 'pointer' }} className="nav__link dropdown__link" onClick={() => linkAction('about', false)}>
                                        Quản lý tòa nhà
                                        <i className="bx bx-chevron-down dropdown__icon" />
                                    </div>
                                    <ul className="dropdown__menu">
                                        <li className="dropdown__item">
                                            <Link className="nav__link link__item" to='/company' onClick={requireLogin}>
                                                Công ty
                                            </Link>
                                        </li>
                                        <li className="dropdown__item">
                                            <Link className="nav__link link__item" to='/floors' onClick={requireLogin}>
                                                Mặt bằng
                                            </Link>
                                        </li>
                                    </ul>
                                </li><li className="nav__item dropdown">
                                <div id="service" style={{ cursor: 'pointer' }} className="nav__link dropdown__link" onClick={() => linkAction('service', false)}>
                                    Quản lý Dịch vụ
                                    <i className="bx bx-chevron-down dropdown__icon" />
                                </div>
                                <ul className="dropdown__menu">
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/service-registration/companies' onClick={requireLogin}>
                                            Đăng ký dịch vụ
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/service-management' onClick={requireLogin}>
                                            Quản lý dịch vụ
                                        </Link>
                                    </li>
                                </ul>
                            </li>


                                </>
                                
                            
                            ) : null}

                            {/* Phần hiển thị Đăng nhập hoặc Đăng xuất */}
                            {
                                !token ? (
                                    <li className="nav__item">
                                        <Link id='contact' className="login-btn" to={`/login`} onClick={() => linkAction('contact', true)}>
                                            <div style={{ textAlign: 'center', color: '#fff' }}>ĐĂNG NHẬP</div>
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="nav__item dropdown">
                                        <div id='userSection' className="nav__link">
                                            <div>
                                                <i style={{ fontSize: "26px", marginRight: "5px" }} className='bx bxs-user-circle'></i>
                                                {username}
                                            </div>
                                        </div>
                                        <ul className="dropdown__menu">
                                            <li style={{ cursor: "pointer" }} className="dropdown__item">
                                                <div className="nav__link">
                                                    Thông tin
                                                </div>
                                            </li>
                                            <li style={{ cursor: "pointer" }} className="dropdown__item">
                                                <div className="nav__link">
                                                    <Link className="nav__link link__item" to='/use-list' onClick={requireLogin}>
                                                        Quản lý người dùng
                                                    </Link>
                                                </div>
                                            </li>
                                            <li style={{ cursor: "pointer" }} className="dropdown__item" onClick={logout}>
                                                <div className="nav__link">
                                                    Đăng xuất
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
