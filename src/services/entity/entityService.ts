import { TransformationInfo, transformationMap } from './entityRenderService';

export interface EntityInfo {
    entity: string;
    transformations?: TransformationInfo[];
}

// Function to get entity and transformations from a string like "WHITE_SOLOON" or "UP_COMETH"
export function getEntityInfo(entityString: string): EntityInfo {
    const parts = entityString.split('_');
    const entity = parts[parts.length - 1]; // The last part is the entity (e.g., SOLOON, COMETH)

    const transformations = parts.slice(0, -1)
        .map((transformation) => transformationMap.get(transformation))
        .filter(Boolean) as TransformationInfo[];

    return {
        entity,
        transformations,
    };
}

// Returns the parameters for the postEntity function
export function getPostParams(row: number, col: number, entityString: string) {
    const entityInfo = getEntityInfo(entityString);

    // Do not post for entities like SPACE
    if (entityInfo.entity === 'SPACE') {
        return null;
    }

    // Create parameters object
    const params: any = {
        row,
        col,
        entity: entityInfo.entity,
    };

    entityInfo.transformations?.forEach((transformation, index) => {
        const transformationKey = entityString.split('_')[index].toLowerCase();  // Extract the key dynamically from entityString
        params[transformation.type] = transformationKey;
    });

    return params;
}
