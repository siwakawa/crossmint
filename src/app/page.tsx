"use client";

import { useRouter } from 'next/navigation';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; 

export default function Home() {
    const router = useRouter();

    const handleShowMap = () => {
        router.push('/challenge');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <img
                src="/profile.jpg" 
                alt="Profile"
                className="rounded-full w-32 h-32 mb-4"
            />

            <h1 className="text-3xl font-bold mb-2">Santiago Iwakawa</h1>
            <p className="text-lg mb-8 text-center">
                Thanks for the opportunity! Excited to show you my approach for the Crossmint challenge.
            </p>

            <div className="flex space-x-4 mb-8">
                <a
                    href="https://www.linkedin.com/in/siwakawa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400"
                >
                    <FaLinkedin size={32} /> 
                </a>
                <a
                    href="https://github.com/siwakawa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400"
                >
                    <FaGithub size={32} /> 
                </a>
            </div>

            <button
                onClick={handleShowMap}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Go to Challenge
            </button>
        </div>
    );
}
