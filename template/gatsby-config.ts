import { GatsbyConfig } from 'gatsby';
import { default as config } from './config';

const plugins: GatsbyConfig['plugins'] = [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    // {
    //     resolve: `gatsby-plugin-layout`,
    //     options: {
    //         component: require.resolve(`./src/templates/MDXDocumentTemplate.tsx`),
    //     },
    // },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
];

// Now, add a "gatsby-source-filesystem" plugin for each document.
import { Guides } from './content/guides';

for (let document_code in Guides) {
    plugins.push({
        resolve: 'gatsby-source-filesystem',
        options: {
            name: document_code,
            path: `${__dirname}/content/${document_code}/`,
        },
    });
}

plugins.push({
    resolve: 'gatsby-source-filesystem',
    options: {
        name: 'blog',
        path: `${__dirname}/content/blog/`,
    },
});

plugins.push({
    resolve: 'gatsby-plugin-mdx',
    options: {
        gatsbyRemarkPlugins: [
            {
                resolve: 'gatsby-remark-images',
                options: {
                    maxWidth: 1035,
                    //sizeByPixelDensity: true,
                },
            },
            {
                resolve: 'gatsby-remark-copy-linked-files',
            },
        ],
        extensions: ['.mdx', '.md'],
    },
});

plugins.push(
    // You can have multiple instances of this plugin to create indexes with
    // different names or engines. For example, multi-lingual sites could create
    // an index for each language.
    {
        resolve: 'gatsby-plugin-local-search',
        options: {
            // A unique name for the search index. This should be descriptive of
            // what the index contains. This is required.
            name: 'pages',

            // Set the search engine to create the index. This is required.
            // The following engines are supported: flexsearch, lunr
            engine: 'flexsearch',

            // Provide options to the engine. This is optional and only recommended
            // for advanced users.
            //
            // Note: Only the flexsearch engine supports options.
            engineOptions: 'speed',

            // GraphQL query used to fetch all data for the search index. This is
            // required.
            query: `
                    {
                        allMdx {
                        edges {
                            node {
                            id
                            frontmatter {
                                title
                            }
                            rawBody
                            slug
                            
                            parent {
                                ... on File {
                                    id
                                    name
                                    sourceInstanceName
                                }
                            }
                            }
                        }
                        }
                    }
                    
                `,

            // Field used as the reference value for each document.
            // Default: 'id'.
            ref: 'id',

            // List of keys to index. The values of the keys are taken from the
            // normalizer function below.
            // Default: all fields
            index: ['title', 'body'],

            // List of keys to store and make available in your UI. The values of
            // the keys are taken from the normalizer function below.
            // Default: all fields
            store: ['id', 'path', 'title', 'documentName'],

            // Function used to map the result from the GraphQL query. This should
            // return an array of items to index in the form of flat objects
            // containing properties to index. The objects must contain the `ref`
            // field above (default: 'id'). This is required.
            normalizer: ({ data }) =>
                data.allMdx.edges.map((edge) => ({
                    id: edge.node.id,
                    path: edge.node.slug,
                    title: edge.node.frontmatter.title,
                    body: edge.node.rawBody,
                    documentName: edge.node.parent.sourceInstanceName,
                })),
        } as any,
    }
);
plugins.push({
    resolve: `gatsby-plugin-gtag`,
    options: {
        // your google analytics tracking id
        trackingId: config.gatsby.gaTrackingId,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: false,
    } as any,
});

plugins.push(`gatsby-plugin-graphql-codegen`);

//'gatsby-plugin-typegen',

// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
    plugins.push({
        resolve: `gatsby-plugin-manifest`,
        options: { ...config.pwa.manifest } as any,
    });
    plugins.push({
        resolve: 'gatsby-plugin-offline',
        options: {
            appendScript: require.resolve(`./src/custom-sw-code.js`),
        } as any,
    });
} else {
    plugins.push('gatsby-plugin-remove-serviceworker');
}

// check and remove trailing slash
if (config.gatsby && !config.gatsby.trailingSlash) {
    plugins.push('gatsby-plugin-remove-trailing-slashes');
}

export const Configuration = {
    pathPrefix: config.gatsby.pathPrefix,
    siteMetadata: {
        title: config.siteMetadata.title,
        description: config.siteMetadata.description,
        docsLocation: config.siteMetadata.docsLocation,
        ogImage: config.siteMetadata.ogImage,
        favicon: config.siteMetadata.favicon,
        logo: {
            link: config.header.logoLink ? config.header.logoLink : '/',
            image: config.header.logo,
        }, // backwards compatible
        headerTitle: config.header.title,
        helpUrl: config.header.helpUrl,
        headerLinks: config.header.links,
        siteUrl: config.gatsby.siteUrl,
    },
    plugins: plugins,
    flags: {
        DEV_SSR: false,
        FAST_DEV: false, // Enable all experiments aimed at improving develop server start time
        PRESERVE_WEBPACK_CACHE: false, // (Umbrella Issue (https://gatsby.dev/cache-clearing-feedback)) · Use webpack's persistent caching and don't delete webpack's cache when changing gatsby-node.js & gatsby-config.js files.
        PRESERVE_FILE_DOWNLOAD_CACHE: false, // (Umbrella Issue (https://gatsby.dev/cache-clearing-feedback)) · Don't delete the downloaded files cache when changing gatsby-node.js & gatsby-config.js files.
        PARALLEL_SOURCING: false, // EXPERIMENTAL · (Umbrella Issue (https://gatsby.dev/parallel-sourcing-feedback)) · Run all source plugins at the same time instead of serially. For sites with multiple source plugins, this can speedup sourcing and transforming considerably.
        FUNCTIONS: false, // EXPERIMENTAL · (Umbrella Issue (https://gatsby.dev/functions-feedback)) · Compile Serverless functions in your Gatsby project and write them to disk, ready to deploy to Gatsby Cloud
    },
};
