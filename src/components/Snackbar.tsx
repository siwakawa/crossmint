"use client";

import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface SnackbarProps {
    message: string;
    onClose: () => void;
}

export default function Snackbar({ message, onClose }: SnackbarProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-400 text-white px-6 py-3 rounded-lg shadow-lg flex justify-between items-center space-x-4 transition-all duration-300 ease-in-out max-w-xs">
            <span>{message}</span>
            <button
                onClick={() => {
                    setVisible(false);
                    onClose();
                }}
                className="ml-4 text-white font-bold focus:outline-none"
            >
                <AiOutlineClose size={20} />
            </button>
        </div>
    );
}
