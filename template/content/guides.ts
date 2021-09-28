import { ICustomizerFunction, IHTFMConfiguration } from '../src/config/ICustomizer';

export const customize: ICustomizerFunction = (customizer) => {
    customizer.setConfig({
        titleBar: {
            mainTitle: 'HTFM',
            subTitle: 'Project/Developer Documentation',
        },
    });

    customizer.updateConfig((curSettings: IHTFMConfiguration) => {
        let updatedSettings: IHTFMConfiguration = {
            ...curSettings,
            titleBar: {
                ...curSettings.titleBar,
                mainTitle: 'HTFM',
            },
        };

        return updatedSettings;
    });   
    
    customizer.registerGuide({
        title: 'Getting Started',
        location: 'getting_started',
    });

    customizer.registerGuide({
        title: 'How-Tos',
        location: 'how_tos',
    });
}

// export const customize = (registerGuide: (guideInfo: IGuideInfo) => void) => {
//     registerGuide({
//         title: 'HTFM',
//         location: 'meta_docs',
//     });

// };
