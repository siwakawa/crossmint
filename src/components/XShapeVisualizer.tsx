import { getEmoji, getTransformationStyles } from '@/services/entity/entityRenderService';
import { getEntityInfo } from '../services/entity/entityService';

export default function XShapeVisualizer({ mapData }: { mapData: string[][] }) {
  return (
    <div className="mt-4 text-xl">
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => {
            const entityInfo = getEntityInfo(cell); // Get entity and transformations
            const style = getTransformationStyles(entityInfo.transformations || []); // Get classes and styles
            const emoji = getEmoji(entityInfo.entity); // Get the emoji
            return (
              <span key={`${rowIndex}-${colIndex}`} className={`ml-1 mr-1`} style={style}>
                {emoji}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
