"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import XShapeVisualizer from '@/components/XShapeVisualizer';

import { delay } from '@/helpers/delay';
import { useLoading } from '@/context/loadingContext';
import Snackbar from '@/components/Snackbar'; 
import { getPostParams } from '@/services/entity/entityService';
import { fetchMap, postEntity } from '@/services/api/megaverseApi';

export default function Challenge() {
    const { isLoading, setIsLoading, setLoadingMessage } = useLoading();
    const [errorMessage, setErrorMessage] = useState('');
    const [mapData, setMapData] = useState<string[][]>([]);
    const [challengeCompleted, setChallengeCompleted] = useState(false); 
    const [showRetry, setShowRetry] = useState(false);
    const router = useRouter(); 

    const fetchData = async () => {
        setIsLoading(true);
        setLoadingMessage('Fetching map data...');
        try {
            const data = await fetchMap();
            setMapData(data.goal);
            setErrorMessage(''); // Clear any previous error
            setShowRetry(false); // Hide retry button when data is fetched successfully
        } catch {
            setErrorMessage('Error occurred while fetching the map');
            setShowRetry(true); // Show retry button on error
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const handleCompleteChallenge = async () => {
        setIsLoading(true);
        setLoadingMessage('Starting challenge...');
        try {
            for (let row = 0; row < mapData.length; row++) {
                for (let col = 0; col < mapData[row].length; col++) {
                    const postParams = getPostParams(row, col, mapData[row][col]);
                    setLoadingMessage(`Processing item for row: ${row + 1} and col: ${col + 1}...`);
                    if (!postParams) continue;
                    await postEntity(postParams);
                    await delay(250); // To avoid 429 errors
                }
            }
            setChallengeCompleted(true);
        } catch (error) {
            setErrorMessage('Error completing the challenge');
            setShowRetry(true); 
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setLoadingMessage(''); // Reset message after loading
        }
    };

    const handleCloseSnackbar = () => {
        setErrorMessage(''); // Close the snackbar by clearing the error message
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-center my-10">
                {/* Success message */}
                {challengeCompleted && (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-6 mt-10">
                            Thank you for your time and consideration! 🌟
                        </h1>
                        <p className="text-lg text-white">
                            I hope this solution meets your expectations and demonstrates my skills effectively.
                            Looking forward to your feedback!
                        </p>
                        {/* Button to go back to the home page */}
                        <button
                            onClick={() => router.push('/')} // Navigate to home
                            className="px-6 py-3 mt-6 text-white bg-gray-500 rounded hover:bg-gray-600"
                        >
                            Back to Home
                        </button>
                    </div>
                )}

                {/* Visualizer and button */}
                {!isLoading && mapData.length > 0 && !challengeCompleted && (
                    <>
                        <XShapeVisualizer mapData={mapData} />
                        <button
                            onClick={handleCompleteChallenge}
                            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Complete Challenge
                        </button>
                    </>
                )}

                {/* Retry button on error */}
                {showRetry && (
                    <div className="fixed inset-0 flex justify-center items-center">
                        <button
                            onClick={fetchData}
                            className="px-6 py-3 text-white bg-gray-500 rounded hover:bg-gray-600"
                        >
                            Retry Loading Data
                        </button>
                    </div>
                )}

                {/* Snackbar for errors */}
                {errorMessage && (
                    <Snackbar message={errorMessage} onClose={handleCloseSnackbar} />
                )}
            </div>
        </div>
    );
}
