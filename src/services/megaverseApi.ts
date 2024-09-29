// src/services/megaverseApi.ts
import httpClient from './httpClient';

const API_URL = `https://challenge.crossmint.com/api`;

// Function to fetch the map data
export async function fetchMap() {
    const url = `${API_URL}/map/${process.env.NEXT_PUBLIC_CANDIDATE_ID}/goal`;
    return await httpClient.get(url);
}

// Function to post a Polyanet
export async function postPolyanet(row: number, column: number) {
    const url = `${API_URL}/polyanets`;
    return await httpClient.post(url, {
        row,
        column,
        candidateId: process.env.NEXT_PUBLIC_CANDIDATE_ID,
    });
}

