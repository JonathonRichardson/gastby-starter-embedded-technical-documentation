import React from "react";
import { IGuideInfo } from "./guides/IGuideInfo";

export interface IHTFMConfiguration {
    /**
     * Settings for the top title bar
     */
    titleBar: {
        /**
         * The text or JSX to appear before the "|" in the app bar
         */
        mainTitle: string | React.ReactNode;
        /**
         * The text or JSX to appear after the "|" in the app bar
         */
        subTitle: string | React.ReactNode;
    };
}

export interface ICustomizer {
    setConfig: (settings: Partial<IHTFMConfiguration>) => void;
    updateConfig: (
        configureFunction: (currentSettings: IHTFMConfiguration) => IHTFMConfiguration
    ) => void;
    registerGuide: (guideInfo: IGuideInfo) => void;
}

export type ICustomizerFunction = (customizer: ICustomizer) => void;