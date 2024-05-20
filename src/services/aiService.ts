import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || '';

export const analyzeFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        // const { data } = await axios.post(`${API_URL}/analyze`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });
        // return data.result;
    } catch (error) {
        console.error('Analyze file error', error);
        return 'Analysis failed';
    }
};
