export interface INode {
    label: string;
    id: string;
    urlSlug: string;
    parentSlug: string | null;
    title: string;
    children?: INode[];
    sortOrder?: number;
    defaultToCollapsed?: boolean;
    documentName: string;
}
