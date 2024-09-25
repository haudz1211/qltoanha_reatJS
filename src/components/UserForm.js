// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ currentUser, onSave }) => {
    const [user, setUser] = useState({ username: '', fullName: '', password: '' });

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.id) {
            await axios.put(`http://localhost:8080/api/users/${user.id}`, user);
        } else {
            await axios.post('http://localhost:8080/api/users', user);
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{user.id ? 'Sửa người dùng' : 'Thêm người dùng'}</h2>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                required={!user.id} // Password chỉ yêu cầu khi thêm mới
            />
            <button type="submit">Lưu</button>
        </form>
    );
};

export default UserForm;
