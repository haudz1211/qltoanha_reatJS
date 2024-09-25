import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../css/login.css';
import imgPath from '../assets/img/img-login.svg';
import { login } from '../redux/actions/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const error = useSelector(state => state.login.error);

    const signIn = (e) => {
        e.preventDefault();
        const data = { username, password };
        dispatch(login(data)).then(() => {
            if (localStorage.getItem('token')) {
                window.location.reload();
            }
        });
    };

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={imgPath} alt="Login" />
                </div>
                <form className="login__forms" onSubmit={signIn}>
                    <h1 className="login__title">Đăng nhập</h1>
                    <div className="login__box">
                        <i className="bx bx-user login__icon" />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="login__input" 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="login__box">
                        <i className="bx bx-lock-alt login__icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="login__input"
                            autoComplete="on"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login__button">
                        Đăng nhập
                    </button>
                    <span className="login__account" nClick={() => window.location.href = '/register'}>Bạn chưa có tài khoản? 
                        <span className="login__signup" onClick={() => window.location.href = '/register'}> Đăng kí</span>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
