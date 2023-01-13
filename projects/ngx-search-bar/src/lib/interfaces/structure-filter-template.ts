export type StructureFilterTemplate = {
    type: 'array' | 'boolean' | 'string';
    name: string;
    [key: string]: Array<any> | boolean | string | number | null | undefined | StructureFilterTemplate;
}