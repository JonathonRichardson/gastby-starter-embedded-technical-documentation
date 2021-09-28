import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Layout } from '../components/Layout';
import { NextPrevious } from '../components/NextPrevious';
import config from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from '../components/styles/Docs';
import { MdxDocumentTemplateQuery } from '../../graphql-types';
import { getGlobalHTFMConfiguration } from '../config/HTFMConfigurationBuilder';

const forcedNavOrder = [];
const Helmet2 = Helmet as any as React.Component<{}>;

interface IProps {
    data: MdxDocumentTemplateQuery;
}

export default class DocumentTemplate extends React.Component<IProps> {
    render() {
        const { data } = this.props;

        if (!data) {
            return this.props.children;
        }

        const { allMdx, mdx } = data;

        var nextPrevious = null;
        if (allMdx) {
            const navItems = allMdx.edges
                .map(({ node }) => node.fields.slug)
                .filter((slug) => slug !== '/')
                .sort()
                .reduce(
                    (acc, cur) => {
                        if (forcedNavOrder.find((url) => url === cur)) {
                            return { ...acc, [cur]: [cur] };
                        }

                        let prefix = cur.split('/')[1];

                        if (config.gatsby && config.gatsby.trailingSlash) {
                            prefix = prefix + '/';
                        }

                        if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
                            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
                        } else {
                            return { ...acc, items: [...acc.items, cur] };
                        }
                    },
                    { items: [] }
                );

            const nav = forcedNavOrder
                .reduce((acc, cur) => {
                    return acc.concat(navItems[cur]);
                }, [])
                .concat(navItems.items)
                .map((slug) => {
                    if (slug) {
                        const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

                        return { title: node.fields.title, url: node.fields.slug };
                    }
                });

            nextPrevious = <NextPrevious mdx={mdx} nav={nav} />;
        }

        // meta tags
        const configuredTitle = mdx ? mdx.frontmatter.title : '';
        const metaTitle = (mdx && mdx.frontmatter.metaTitle) || configuredTitle || '';
        const metaDescription = (mdx && mdx.frontmatter.metaDescription) || '';

        let canonicalUrl = config.gatsby.siteUrl;

        canonicalUrl =
            config.gatsby.pathPrefix !== '/'
                ? canonicalUrl + config.gatsby.pathPrefix
                : canonicalUrl;
        canonicalUrl = canonicalUrl + (mdx ? mdx.fields.slug : '');

        const HTFMConfig = getGlobalHTFMConfiguration();
        let guide = HTFMConfig.getGuides().find(guide => guide.documentCode == mdx.parent.sourceInstanceName);

        return (
            <Layout
                location=""
                docName={mdx.parent.sourceInstanceName}
                docTitle={guide ? guide.title : mdx.parent.sourceInstanceName}
                hideLeftNav={false}
            >
                {/* <Helmet2>
                    <title>{metaTitle}</title>
                    <meta name="title" content={metaTitle} />
                    <meta property="og:title" content={metaTitle} />
                    <meta property="twitter:title" content={metaTitle} />

                    <meta name="description" content={metaDescription} />
                    <meta property="og:description" content={metaDescription} />
                    <meta property="twitter:description" content={metaDescription} />

                    <link rel="canonical" href={canonicalUrl} />
                </Helmet2> */}

                <div className={'titleWrapper'}>
                    <StyledHeading>{mdx ? mdx.fields.title : ''}</StyledHeading>
                </div>

                <StyledMainWrapper>
                    {mdx && <MDXRenderer scope="">{mdx.body}</MDXRenderer>}
                </StyledMainWrapper>

                <div className={'addPaddTopBottom'}>{nextPrevious}</div>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query MDXDocumentTemplate($id: String!) {
        site {
            siteMetadata {
                title
                docsLocation
            }
        }
        mdx(fields: { id: { eq: $id } }) {
            fields {
                id
                title
                slug
            }
            body
            tableOfContents
            parent {
                ... on File {
                    relativePath
                    sourceInstanceName
                }
            }
            frontmatter {
                title
                metaTitle
                metaDescription
            }
        }
        allMdx {
            edges {
                node {
                    fields {
                        slug
                        title
                    }
                    parent {
                        id
                        ... on File {
                            id
                            name
                            absolutePath
                            sourceInstanceName
                        }
                    }
                }
            }
        }
    }
`;
