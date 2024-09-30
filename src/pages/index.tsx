"use client";
import { useState, useEffect } from 'react';
import XShapeVisualizer from '../components/XShapeVisualizer';
import { fetchMap, postEntity } from '../services/megaverseApi';
import '../app/globals.css';
import { delay } from '@/helpers/delay';
import { getPostParams } from '@/services/entityService';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [mapData, setMapData] = useState<string[][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchMap();
                setMapData(data.goal);
            } catch {
                setMessage('Error occurred while fetching the map');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCompletePhase2 = async () => {
        setLoading(true);
        try {
            for (let row = 0; row < mapData.length; row++) {
                for (let col = 0; col < mapData[row].length; col++) {
                    const postParams = getPostParams(row, col, mapData[row][col]);

                    if (!postParams) continue;

                    await postEntity(postParams);
                    await delay(300); //Delay to avoid 429
                }
            }
            setMessage('Phase 2 completed successfully!');
        } catch (error) {
            setMessage('Error completing Phase 2');
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
                    <button onClick={handleCompletePhase2} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Complete Phase 2
                    </button>
                </>
            )}
        </div>
    );
}
