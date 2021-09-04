export interface IDocumentInfo {
    title: string;
}

export type DocumentCode = 'documentation' | 'getting_started' | 'how_tos';

export const Documents: { [key in DocumentCode]: IDocumentInfo } = {
    documentation: {
        title: 'Developer Documentation',
    },
    getting_started: {
        title: 'Getting Started',
    },
    how_tos: {
        title: 'How-Tos',
    },
};
