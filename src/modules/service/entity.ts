export interface IServiceEntity {
    id: string;
    name: string;
    description: string;
    status: { label: string; value: string };
    rule: {
        autoIncrement: { start: number; end: number };
        prefix: string;
        suffix: string;
        reset: boolean;
    };
}
