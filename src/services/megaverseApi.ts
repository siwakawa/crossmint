import httpClient from './httpClient';

const API_URL = `https://challenge.crossmint.com/api`;

export async function fetchMap() {
    const url = `${API_URL}/map/${process.env.NEXT_PUBLIC_CANDIDATE_ID}/goal`;
    return await httpClient.get(url);
}

interface PostEntityParams {
    row: number;
    col: number;
    entity: string;
    color?: string; // Optional color for SOLOONs
    direction?: string; // Optional direction for COMETHs
}

interface PostEntityParams {
    row: number;
    col: number;
    entity: string;
    color?: string; 
    direction?: string;
}

export async function postEntity({ row, col, entity, color, direction }: PostEntityParams) {
    const url = `${API_URL}/${entity.toLowerCase()}s`; 
    const candidateId = process.env.NEXT_PUBLIC_CANDIDATE_ID || '';
    const body: { 
        candidateId: string,
        row: number; 
        column: number; 
        color?: string; 
        direction?: string 
    } = { candidateId, row, column: col };

    if (color) body.color = color.toLowerCase();
    if (direction) body.direction = direction.toLowerCase();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error posting ${entity}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Failed to post ${entity}:`, error);
    }
}
