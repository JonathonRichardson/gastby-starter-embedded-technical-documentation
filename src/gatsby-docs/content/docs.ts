export interface IDocumentInfo {
    title: string;
}

export type DocumentCode = 'meta_docs' | 'getting_started' | 'how_tos';

export const Documents: { [key in DocumentCode]: IDocumentInfo } = {
    meta_docs: {
        title: 'About the Documentation Site',
    },
    getting_started: {
        title: 'Getting Started',
    },
    how_tos: {
        title: 'How-Tos',
    },
};
