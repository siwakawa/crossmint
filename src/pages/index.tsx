// src/pages/index.tsx (Home - Phase 1)
"use client";

import { useState, useEffect } from 'react';
import XShapeVisualizer from '../components/XShapeVisualizer';
import { fetchMap, postPolyanet } from '../services/megaverseApi';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [mapData, setMapData] = useState<string[][]>([]); // Matrix for the map

    // Fetch the map data when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchMap(); // Fetch map data from the service
                setMapData(data.goal); // Store the map matrix
            } catch (error) {
                setMessage('Error occurred while fetching the map');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to complete Phase 1 (placing POLYANETs)
    const handleCompletePhase1 = async () => {
        setLoading(true);
        try {
            for (let row = 0; row < mapData.length; row++) {
                for (let col = 0; col < mapData[row].length; col++) {
                    if (mapData[row][col] === 'POLYANET') {
                        await postPolyanet(row, col); // Post each POLYANET in the correct position
                    }
                }
            }
            setMessage('Phase 1 completed successfully!');
        } catch (error) {
            setMessage('Error completing Phase 1');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            {message && <p className="text-red-500">{message}</p>}
            {!loading && mapData.length > 0 && (
                <>
                    <XShapeVisualizer mapData={mapData} />
                    {/* Button to complete Phase 1 */}
                    <button
                        onClick={handleCompletePhase1}
                        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Complete Phase 1
                    </button>
                </>
            )}
        </div>
    );
}
