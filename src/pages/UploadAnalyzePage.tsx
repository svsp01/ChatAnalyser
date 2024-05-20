import React, { useState } from 'react';
import { analyzeFile } from '../services/aiService';

const UploadAnalyzePage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (file) {
            const result: any = await analyzeFile(file);
            setAnalysisResult(result);
        }
    };

    return (
        <div className="upload-analyze-page">
            <h1>Upload and Analyze</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleAnalyze}>Analyze</button>
            {analysisResult && <div className="result">{analysisResult}</div>}
        </div>
    );
};

export default UploadAnalyzePage;
