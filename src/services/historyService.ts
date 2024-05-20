// src/services/historyService.ts
import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || '';

export const getSearchHistory = async () => {
    try {
        // const { data } = await axios.get(`${API_URL}/history`, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // });
        // return data.history;
    } catch (error) {
        console.error('Get search history error', error);
        return [];
    }
};
