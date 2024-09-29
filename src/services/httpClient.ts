// src/services/httpClient.ts

import axios from 'axios';

// Interface for the HTTP client to abstract away the implementation
interface HttpClient {
    get: (url: string, config?: any) => Promise<any>;
    post: (url: string, data: any, config?: any) => Promise<any>;
}

const httpClient: HttpClient = {
    // Wrap axios get method
    get: async (url: string, config = {}) => {
        try {
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error('Error on GET request:', error);
            throw error;
        }
    },

    // Wrap axios post method
    post: async (url: string, data: any, config = {}) => {
        try {
            const response = await axios.post(url, data, config);
            return response.data;
        } catch (error) {
            console.error('Error on POST request:', error);
            throw error;
        }
    }
};

export default httpClient;
