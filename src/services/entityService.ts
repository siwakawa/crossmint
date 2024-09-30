export interface EntityInfo {
    entity: string;
    transformations?: TransformationInfo[];
}

export interface TransformationInfo {
    type: string;
    className?: string;
    style?: React.CSSProperties;
}

// Map for entity emojis
const entityMap = new Map<string, string>([
    ['POLYANET', '🪐'],
    ['SOLOON', '🌕'],
    ['COMETH', '☄️'],
    ['SPACE', '🌌'],
]);

// Map for transformations (className and styles)
const transformationMap = new Map<string, TransformationInfo>([
    ['BLUE', { type: 'color', style: { filter: 'grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8)' } }],
    ['RED', { type: 'color', style: { filter: 'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)' } }],
    ['PURPLE', { type: 'color', style: { filter: 'grayscale(100%) brightness(70%) sepia(50%) hue-rotate(250deg) saturate(500%) contrast(1)' } }],
    ['WHITE', { type: 'color', style: { filter: 'brightness(100%) grayscale(100%)' } }],

    ['UP', { type: 'direction', className: 'rotate-[48deg]' }],
    ['DOWN', { type: 'direction', className: 'rotate-[230deg]' }],
    ['LEFT', { type: 'direction', className: 'rotate-[330deg]' }],
    ['RIGHT', { type: 'direction', className: 'rotate-[140deg]' }],
]);

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

// Function to get the emoji for an entity
export function getEmoji(entity: string): string {
    return entityMap.get(entity) || '🌌';
}

// Function to get the class names and styles for the transformations
export function getTransformationClassesAndStyles(transformations: TransformationInfo[]) {
    const className = transformations.map(t => t.className).join(' ');
    const style = transformations.reduce((acc, t) => ({ ...acc, ...t.style }), {});

    return { className, style };
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

    // Dynamically add color, direction, or any other type based on transformations
    entityInfo.transformations?.forEach((transformation, index) => {
        const transformationKey = entityString.split('_')[index].toLowerCase();  // Extract the key dynamically from entityString
        params[transformation.type] = transformationKey; // Use the key (e.g., 'white', 'up')
    });

    return params;
}
