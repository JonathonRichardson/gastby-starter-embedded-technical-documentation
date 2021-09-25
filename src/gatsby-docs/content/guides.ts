export interface IDocumentInfo {
    title: string;
}

export type BookCode = 'meta_docs' | 'getting_started' | 'how_tos';

export const Guides: { [key in BookCode]: IDocumentInfo } = {
    meta_docs: {
        title: 'HTFM',
    },
    getting_started: {
        title: 'Getting Started',
    },
    how_tos: {
        title: 'How-Tos',
    },
};
