import React, { useEffect, useState } from 'react';
import { analyzeFile } from '../services/aiService';
import { FiPlay } from 'react-icons/fi';
import { motion, useAnimation } from 'framer-motion';



const UploadAnalyzePage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState('');
    const [audioBlob, setAudioBlob] = useState<Blob | MediaSource | null>(null);
    const [textFile, setTextFile] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [circleSize, setCircleSize] = useState(50);
    const [outerCircleSize, setOuterCircleSize] = useState(60);

    const circleControls = useAnimation();
    const outerCircleControls = useAnimation();


    useEffect(() => {
        if (isPlaying) {
            circleControls.start({ scale: 2 });
            outerCircleControls.start({ scale: 2.2 });
        } else {
            circleControls.start({ scale: 0.2 });
            outerCircleControls.start({ scale: 1.1 });
        }
    }, [isPlaying, circleControls, outerCircleControls]);

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
        setIsPlaying(true);
        if (audioBlob) {
            const audioURL = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioURL);
            audio.play();
            audio.addEventListener('ended', () => {
                setIsPlaying(false);
            });
        }
    };

    return (
        <div className="upload-analyze-page flex flex-col items-center justify-center min-h-screen bg-pastel-blue">
            <h1 className="text-4xl font-semibold mb-8 text-gray-500">Text to voice</h1>
            <textarea
                onChange={(e: any) => setTextFile(e.target.value)}
                placeholder="Transform your text into Voice"
                className="rounded-lg p-6 w-[70%] resize-none mb-10"
            />

            <button
                onClick={handleAnalyze}
                className="flex items-center mb-4 space-x-2 bg-pastel-pink text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pastel-pink-dark transition duration-300 transform hover:scale-105 active:scale-95"
            >
                <FiPlay className="text-2xl" />
                <span>Analyze</span>
            </button>
            {analysisResult && <div className="result mt-8 text-pastel-purple text-lg">{analysisResult}</div>}
            {audioBlob && (
                <div>
                    <motion.div
                        className="rounded-full my-16 bg-gradient-to-r from-pink-300 to-purple-300 "
                        style={{ width: circleSize, height: circleSize }}
                        animate={circleControls}
                    />
                    <motion.div
                        className="relative"
                        style={{ width: outerCircleSize, height: outerCircleSize }}
                    >
                        <motion.button
                            onClick={handlePlay}
                            className="bg-gradient-to-r from-pink-300 to-purple-300 hover:from-purple-300 hover:to-pink-300 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isPlaying ? 'Playing' : 'Play'}
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UploadAnalyzePage;
