import React, { useState } from 'react';
import { analyzeFile } from '../services/aiService';
import { FiPlay, FiUpload } from 'react-icons/fi';

const UploadAnalyzePage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState('');
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [textFile, setTextFile] = useState("")
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const query = async (data: any) => {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.blob();
    };



    const handleAnalyze = async () => {
        if (file) {
            const result: any = await analyzeFile(file);
            setAnalysisResult(result);
        }
        query({ "inputs": `${textFile}` }).then((response) => {
            setAudioBlob(response);
        }).catch(error => {
            console.error('Error fetching audio:', error);
        });
    };

    const handlePlay = () => {
        if (audioBlob) {
            const audioURL = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioURL);
            audio.play();
        }
    };

    return (
        <div className="upload-analyze-page flex flex-col items-center justify-center min-h-screen bg-pastel-blue">
            <h1 className="text-4xl font-semibold mb-8 text-gray-500">Text to voice</h1>
            <input onChange={(e: any) => setTextFile(e.target.value)} />
            {/* <label className="flex items-center space-x-2 cursor-pointer mb-4">
                <FiUpload className="text-black text-2xl" />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <span className="text-lg text-black">Choose File</span>
            </label> */}
            <button
                onClick={handleAnalyze}
                className="flex items-center space-x-2 bg-pastel-pink text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pastel-pink-dark transition duration-300 transform hover:scale-105 active:scale-95"
            >
                <FiPlay className="text-2xl" />
                <span>Analyze</span>
            </button>
            {analysisResult && <div className="result mt-8 text-pastel-purple text-lg">{analysisResult}</div>}
            {audioBlob && (
                <div>
                    <button onClick={handlePlay}>Play</button>
                </div>
            )}
        </div>
    );
};

export default UploadAnalyzePage;
