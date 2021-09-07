export interface IDocumentInfo {
    title: string;
}

export type BookCode = 'meta_docs' | 'getting_started' | 'how_tos';

export const Books: { [key in BookCode]: IDocumentInfo } = {
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
