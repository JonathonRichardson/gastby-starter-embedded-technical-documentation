export interface IGatsbySiteConfig {
    header: {
        homeButton: {
            /**
             * This will be the home button on the upper left hand corner of the screen
             */
            logoImageUrl: string;
            /**
             * This will be displayed to the right of the main home button as text.
             */
            siteTitle: string;
        };
    };
}
