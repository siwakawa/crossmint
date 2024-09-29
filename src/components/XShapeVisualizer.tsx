// src/components/XShapeVisualizer.tsx

interface XShapeVisualizerProps {
    mapData: string[][]; // Recibe la matriz de datos del mapa
}

export default function XShapeVisualizer({ mapData }: XShapeVisualizerProps) {
    console.log(mapData);
    return (
        <div className="mt-4 text-2xl">
            {mapData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <span key={`${rowIndex}-${colIndex}`} className="w-6 h-6 flex items-center justify-center">
                            {cell === "POLYANET" ? '🪐' : '🌌'} {/* Polyanet or Space */}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
