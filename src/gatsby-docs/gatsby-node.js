const componentWithMDXScope = require('gatsby-plugin-mdx/component-with-mdx-scope');

const path = require('path');

const startCase = require('lodash.startcase');

const config = require('./config');

exports.createPages = ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        resolve(
            graphql(`
                {
                    allMdx {
                        edges {
                            node {
                                fields {
                                    id
                                }
                                tableOfContents
                                fields {
                                    slug
                                }
                                parent {
                                    ... on File {
                                        sourceInstanceName
                                    }
                                }
                            }
                        }
                    }
                }
            `).then((result) => {
                if (result.errors) {
                    console.log(result.errors); // eslint-disable-line no-console
                    reject(result.errors);
                }

                // Create blog posts pages.
                result.data.allMdx.edges.forEach(({ node }) => {
                    createPage({
                        path: path.join(
                            node.parent.sourceInstanceName,
                            node.fields.slug ? node.fields.slug : '/'
                        ),
                        component:
                            node.parent.sourceInstanceName == 'blog'
                                ? path.resolve('./src/templates/BlogPageTemplate.tsx')
                                : path.resolve('./src/templates/MDXDocumentTemplate.tsx'),
                        context: {
                            id: node.fields.id,
                            document: node.parent.sourceInstanceName,
                        },
                    });
                });
            })
        );
    });
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            alias: {
                $components: path.resolve(__dirname, 'src/components'),
                buble: '@philpl/buble', // to reduce bundle size
            },
        },
    });
};

exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: '@babel/plugin-proposal-export-default-from',
    });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
        const parent = getNode(node.parent);

        let value = parent.relativePath.replace(parent.ext, '');

        // if (value === 'index') {
        //     value = '';
        // }

        // if (parent) {
        //     value = path.join(parent.sourceInstanceName, value);
        // }

        if (config.gatsby && config.gatsby.trailingSlash) {
            createNodeField({
                name: `slug`,
                node,
                value: value === '' ? `/` : `/${value}/`,
            });
        } else {
            createNodeField({
                name: `slug`,
                node,
                value: `/${value}`,
            });
        }

        createNodeField({
            name: 'document',
            node,
            value: parent ? parent.sourceInstanceName : null,
        });

        createNodeField({
            name: 'id',
            node,
            value: node.id,
        });

        createNodeField({
            name: 'title',
            node,
            value: node.frontmatter.title || startCase(parent.name),
        });
    }
};
