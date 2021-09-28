import { IGuideInfo } from "./IGuideInfo";

export const Guides: IGuideInfo[] = [];

export const registerGuide = (guideInfo: IGuideInfo) => {
    Guides.push(guideInfo);
}