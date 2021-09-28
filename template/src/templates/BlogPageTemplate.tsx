import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Layout } from '../components/Layout';
import { NextPrevious } from '../components/NextPrevious';
import config from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from '../components/styles/Docs';
import { MdxBlogPageTemplateQuery } from '../../graphql-types';

const forcedNavOrder = [];
const Helmet2 = Helmet as any as React.Component<{}>;

interface IProps {
    data: MdxBlogPageTemplateQuery;
}

export default class BlogPageTemplate extends React.Component<IProps> {
    render() {
        const { data } = this.props;

        if (!data) {
            return this.props.children;
        }

        const { mdx } = data;

        // meta tags
        const configuredTitle = mdx ? mdx.frontmatter.title : '';
        // const metaTitle = (mdx && mdx.frontmatter.metaTitle) || configuredTitle || '';
        // const metaDescription = (mdx && mdx.frontmatter.metaDescription) || '';

        let canonicalUrl = config.gatsby.siteUrl;

        canonicalUrl =
            config.gatsby.pathPrefix !== '/'
                ? canonicalUrl + config.gatsby.pathPrefix
                : canonicalUrl;
        canonicalUrl = canonicalUrl + (mdx ? mdx.fields.slug : '');

        return (
            <Layout
                location=""
                docName={mdx.parent.sourceInstanceName}
                //docTitle={Documents[mdx.parent.sourceInstanceName].title}
                docTitle="Developer Blog"
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
                    <StyledHeading>
                        {mdx ? mdx.fields.title : ''} (
                        {mdx && mdx.frontmatter ? mdx.frontmatter.date : ''})
                    </StyledHeading>
                </div>

                <StyledMainWrapper>
                    {mdx && <MDXRenderer scope="">{mdx.body}</MDXRenderer>}
                </StyledMainWrapper>
            </Layout>
        );
    }
}

export const blogPageQuery = graphql`
    query MDXBlogPageTemplate($id: String!) {
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
                date
            }
        }
    }
`;
