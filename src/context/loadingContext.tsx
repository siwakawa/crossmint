"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    loadingMessage: string;
    setLoadingMessage: (message: string) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    return (
        <LoadingContext.Provider
            value={{ isLoading, setIsLoading, loadingMessage, setLoadingMessage }}
        >
            {children}
        </LoadingContext.Provider>
    );
}
