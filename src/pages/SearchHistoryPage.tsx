// src/pages/SearchHistoryPage.tsx
import React, { useEffect, useState } from 'react';
import { getSearchHistory } from '../services/historyService';

const SearchHistoryPage: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const historyData: any = await getSearchHistory();
            setHistory(historyData);
        };
        fetchHistory();
    }, []);

    return (
        <div className="search-history-page">
            <h1>Search History</h1>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistoryPage;
