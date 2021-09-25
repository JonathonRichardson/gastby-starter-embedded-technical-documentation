export interface IGuideInfo {
    title: string;
}

export type GuideCode = 'meta_docs' | 'getting_started' | 'how_tos';

export const Guides: { [key in GuideCode]: IGuideInfo } = {
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
