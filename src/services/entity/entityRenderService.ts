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
export const transformationMap = new Map<string, TransformationInfo>([
    ['BLUE', { type: 'color', style: { filter: 'grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8)' } }],
    ['RED', { type: 'color', style: { filter: 'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)' } }],
    ['PURPLE', { type: 'color', style: { filter: 'grayscale(100%) brightness(70%) sepia(50%) hue-rotate(250deg) saturate(500%) contrast(1)' } }],
    ['WHITE', { type: 'color', style: { filter: 'brightness(100%) grayscale(100%)' } }],

    ['UP', { type: 'direction', style: { transform: 'rotate(48deg)' } }],
    ['DOWN', { type: 'direction', style: { transform: 'rotate(230deg)' } }],
    ['LEFT', { type: 'direction', style: { transform: 'rotate(330deg)' } }],
    ['RIGHT', { type: 'direction', style: { transform: 'rotate(140deg)' } }],
]);

// Function to get the emoji for an entity
export function getEmoji(entity: string): string {
    return entityMap.get(entity) || '🌌';
}

// Function to get the class names and styles for the transformations
export function getTransformationStyles(transformations: TransformationInfo[]) {
    return transformations.reduce((acc, t) => ({ ...acc, ...t.style }), {});
}
