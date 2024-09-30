import { ReactNode } from "react";
import { useLoading } from "@/context/loadingContext"; 
import LightSpeedTravel from "./LightSpeedTravel"; 

export default function LoadingOverlay({ children }: { children: ReactNode }) {
    const { isLoading, loadingMessage } = useLoading(); 

    return (
        <>
            {isLoading && <LightSpeedTravel message={loadingMessage} />} 
            {children} 
        </>
    );
}
