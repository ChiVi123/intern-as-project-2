export interface IRoleEntity {
    id: string;
    name: string;
    description: string;
    featureGroups: Record<string, string[]>;
}
