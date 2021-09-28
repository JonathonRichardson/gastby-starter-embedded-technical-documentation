export interface IGuideInfo {
    /**
     * This will show on the list of guides on the home page as well as
     * on the top of the node tree when viewing the guide itself.
     */
    title: string;

    /**
     * The directory name containing the guide.  This should not be an absolute
     * path; it should be relative to the `content/` directory (and the guides.ts)
     * file.
     */
    location: string;
}