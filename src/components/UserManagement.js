import React, { useEffect, useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = '<your_token>'; // Thay thế bằng token thực tế của bạn
        fetch('http://localhost:8080/api/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => setUsers(data))
        .catch(err => setError(err));
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Quản Lý Người Dùng</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.fullName} - {user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
