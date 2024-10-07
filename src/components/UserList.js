import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Token from localStorage:", token);  // In token ra console
                console.log("Fetching users...");
                const response = await axios.get('http://localhost:8080/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Fetched Users:", response.data);
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            }
        };
    
        if (token) {
            fetchUsers();
        } else {
            setError("No token found, please log in.");
        }
    }, [token]);
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error("Error deleting user:", err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <h2>Danh sách người dùng</h2>
            {error && <div className="error-message">Lỗi: {error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên tài khoản</th>
                        <th>Họ và tên</th>
                        <th>Hành đông</th>
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
