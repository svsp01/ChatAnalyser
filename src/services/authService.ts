import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const API_URL = process.env.REACT_APP_API_URL || '';

export const login = async (username: string, password: string) => {
    try {
        // const { data } = await axios.post(`${API_URL}/login`, { username, password });
        // const isValid = bcrypt.compareSync(password, data.hashedPassword);
        // if (isValid) {
        //     const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
        //     localStorage.setItem('token', token);
        //     return true;
        // }
        // return false;
    } catch (error) {
        console.error('Login error', error);
        return false;
    }
};
