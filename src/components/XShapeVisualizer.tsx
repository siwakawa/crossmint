import { getEntityInfo, getTransformationClassesAndStyles, getEmoji } from '../services/entityService';

export default function XShapeVisualizer({ mapData }: { mapData: string[][] }) {
  return (
    <div className="mt-4 text-2xl">
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => {
            const entityInfo = getEntityInfo(cell); // Get entity and transformations
            const { className, style } = getTransformationClassesAndStyles(entityInfo.transformations || []); // Get classes and styles
            const emoji = getEmoji(entityInfo.entity); // Get the emoji
            return (
              <span key={`${rowIndex}-${colIndex}`} className={`${className} m-1`} style={style}>
                {emoji}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
