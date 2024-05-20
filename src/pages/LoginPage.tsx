import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const success = await login(username, password);
        if (success) {
            navigate('/upload-analyze');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className='flex justify-center '>
            <div className="flex flex-col gap-2 w-1/2">
                <h1>Login</h1>
                <input type="text" placeholder="Username" className='px-4 border border-gray-500 rounded py-2' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className='px-4 border border-gray-500 rounded py-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;
