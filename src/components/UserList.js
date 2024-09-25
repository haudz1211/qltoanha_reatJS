// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onEdit }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:8080/api/users'); // Thay đổi URL cho đúng với API của bạn
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h2>Danh sách người dùng</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>
                                <button onClick={() => onEdit(user)}>Sửa</button>
                                <button onClick={() => handleDelete(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
