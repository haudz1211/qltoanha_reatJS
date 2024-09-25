import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/register.css'; // Thêm CSS cho trang đăng ký
import imgPath from '../assets/img/img-login.svg';
import { signup } from '../redux/actions/register'; // Đảm bảo sử dụng đúng tên 'signup'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    // Sử dụng tên hàm khác cho tránh xung đột với action `signup`
    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!username.trim() || !password.trim() || !fullName.trim()) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const data = { username, password, fullName };

        try {
            // Gọi action `signup`
            const result = await dispatch(signup(data));
            console.log(result); // Kiểm tra kết quả trả về từ backend
            if (result) {
                window.location.href = '/login'; // Điều hướng tới trang đăng nhập sau khi đăng ký thành công
            } else {
                setErrorMessage("Đăng ký không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <div className="register">
            <div className="register__content">
                <div className="login__img">
                    <img src={imgPath} alt="Login" />
                </div>
                <h1 className="register__title">Tạo Tài Khoản</h1>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="register__input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="register__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            className="register__input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="register__button">Đăng Ký</button>
                    <span className="register__account" onClick={() => window.location.href = '/login'}>
                        Bạn đã có tài khoản? <span className="register__signup">Đăng nhập</span>
                    </span>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default Register;
