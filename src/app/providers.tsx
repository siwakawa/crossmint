"use client"; 

import { ReactNode } from "react";
import { LoadingProvider } from "@/context/loadingContext"; 

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LoadingProvider>
        { children } 
        </LoadingProvider>
  );
}
