import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";

// Star component for the animation
function Star({ position }: { position: [number, number, number] }) {
    const ref = useRef<any>();

    useFrame(() => {
        ref.current.position.z += 0.5;
        if (ref.current.position.z > 5) {
            ref.current.position.z = -50;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshBasicMaterial />
        </mesh>
    );
}

// Array of space facts (with emojis and questions)
const spaceFacts = [
    "🚀 Did you know that a rocket needs to reach a speed of 7.9 km/s to escape Earth's gravity?",
    "🌍 How many Earths can fit inside the Sun? More than 1.3 million Earths could fit inside the Sun!",
    "🌓 Did you know that it takes 27.3 days for the Moon to orbit Earth?",
    "🌌 The Milky Way is estimated to contain over 100 billion stars! ⭐✨",
    "🌕 How far is the Moon from Earth? It's about 384,400 kilometers away (238,855 miles).",
    "🪐 Saturn’s rings are made mostly of water ice, with some rock and dust.",
    "🌠 A single day on Venus lasts longer than a year on Venus! 🕰",
    "🌌 The universe is around 13.8 billion years old. That's a lot of birthdays! 🎂",
    "🌍 The Earth is not a perfect sphere; it's slightly flattened at the poles. 🏔️",
    "🌙 There are footprints on the Moon that will stay there for millions of years! 👣",
];

export default function LightSpeedTravel({ message }: { message: string }) {
    const stars = useMemo(() => {
        return Array.from({ length: 300 }, () => [
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            Math.random() * -100 - 50,
        ]);
    }, []);

    const [currentFact, setCurrentFact] = useState(spaceFacts[0]);

    // Rotate through the space facts every 5 seconds
    useEffect(() => {
        const factInterval = setInterval(() => {
            setCurrentFact((prevFact) => {
                const nextIndex = (spaceFacts.indexOf(prevFact) + 1) % spaceFacts.length;
                return spaceFacts[nextIndex];
            });
        }, 5000);

        return () => clearInterval(factInterval);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                backgroundColor: "var(--background)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
                <ambientLight intensity={0.5} />
                {stars.map((position, index) => (
                    <Star key={index} position={position as [number, number, number]} />
                ))}
            </Canvas>

            <div style={{ zIndex: 1, textAlign: "center" }}>
                <p className="text-white">{message}</p>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                <p className="text-white text-xl">{currentFact}</p>
            </div>
        </div>
    );
}
