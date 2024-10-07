import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/actions/userActions'; // Giả sử bạn có các action này

const UserForm = ({ user, setIsEditMode }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { fullName, username, email };
        if (user) {
            dispatch(updateUser(user.id, userData)); // Cập nhật người dùng
        } else {
            dispatch(addUser(userData)); // Thêm người dùng mới
        }
        setIsEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{user ? "Sửa Người Dùng" : "Thêm Người Dùng"}</h2>
            <div>
                <label>Họ tên:</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
                <label>Tên đăng nhập:</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">{user ? "Cập Nhật" : "Thêm Mới"}</button>
            <button onClick={() => setIsEditMode(false)}>Hủy</button>
        </form>
    );
};

export default UserForm;
