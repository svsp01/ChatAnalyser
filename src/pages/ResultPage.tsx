// src/pages/ResultPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage: React.FC = () => {
    const location = useLocation();
    const { result } = location.state as { result: string };

    return (
        <div className="result-page">
            <h1>Analysis Result</h1>
            <p>{result}</p>
        </div>
    );
};

export default ResultPage;
