const config = {
    gatsby: {
        pathPrefix: '/',
        siteUrl: 'https://hasura.io',
        gaTrackingId: null,
        trailingSlash: false,
    },
    header: {
        logo: '', // Title bar icon
        logoLink: '', // Link Where home button used to go: unused at this point.
        helpUrl: 'https://google.com',
        title: 'Project/Developer Documentation',
    },
    sidebar: {
        links: [
            {
                text: 'Source Control',
                link: '',
            },
            {
                text: 'Issue Tracking',
                link: '',
            },
            {
                text: 'External Documentation',
                link: '',
            },
        ],
        frontline: false,
        ignoreIndex: true,
        title: 'Project/Developer Developer Docs',
    },
    siteMetadata: {
        title: 'Project/Developer Developer Documentation',
        description: 'Documentation built with mdx.',
        ogImage: null,
        docsLocation: '',
        favicon: '', // favicon
    },
    pwa: {
        enabled: false, // disabling this will also remove the existing service worker.
        manifest: {
            name: 'Gatsby Gitbook Starter',
            short_name: 'GitbookStarter',
            start_url: '/',
            background_color: '#6b37bf',
            theme_color: '#6b37bf',
            display: 'standalone',
            crossOrigin: 'use-credentials',
            icons: [
                {
                    src: 'src/pwa-512.png',
                    sizes: `512x512`,
                    type: `image/png`,
                },
            ],
        },
    },
};

module.exports = config;
