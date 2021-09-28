// #region Imports
import { merge } from "lodash";
import { IGuideInfo } from "./guides/IGuideInfo";
import { ICustomizer, IHTFMConfiguration } from "./ICustomizer"
// #endregion Imports

interface IInternalGuideInfo {
    title: string;
    absolutePath: string;
    documentCode: string;
}

class HTFMConfigurationBuilder implements ICustomizer {
    private configuration: IHTFMConfiguration = {
        titleBar: {
            mainTitle: 'HTFM',
            subTitle: 'Project/Developer Documentation',
        },
    };

    private guides: IInternalGuideInfo[];

    public getGuides(): IInternalGuideInfo[] {
        return this.guides;
    }

    registerGuide(guideInfo: IGuideInfo): void {
        this.guides.push({
            title: guideInfo.title,
            absolutePath: `${__dirname}/../../content/${guideInfo.location}/`,
            documentCode: guideInfo.location,
        });
    }

    setConfig(settings: Partial<IHTFMConfiguration>): void {
        merge(this.configuration, settings);
    }

    updateConfig(
        configureFunction: (currentSettings: IHTFMConfiguration) => IHTFMConfiguration
    ): void {
        this.configuration = configureFunction(this.configuration);
    };
}

import { customize } from "../../content/guides";

const GlobalHTFMConfiguration = new HTFMConfigurationBuilder();

// Register the blog
GlobalHTFMConfiguration.getGuides().push({
    title: 'Blog',
    documentCode: 'blog',
    absolutePath: `${__dirname}/../static_content`,
});

// Get the user configured settings/guides
customize(GlobalHTFMConfiguration);

export const getGlobalHTFMConfiguration = () => {
    return GlobalHTFMConfiguration;
}