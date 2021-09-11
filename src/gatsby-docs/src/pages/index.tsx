//#region Imports
import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Layout, Link } from '../components';
import { BookTile, BookTileSet } from '../components/home/BookTile';
import { AllBookColors } from '../components/home/BookTile.svg';
import { GetAllDocumentsQuery } from '../../graphql-types';
import { Books, IDocumentInfo } from '../../content/books';
//#endregion

const forcedNavOrder = [];

export default class MDXRuntimeTest extends Component {
    render() {
        return (
            <Layout {...this.props} hideLeftNav location="/" docName="" docTitle="">
                <h1>Current Docs</h1>

                <StaticQuery<GetAllDocumentsQuery>
                    query={graphql`
                        query GetAllDocuments {
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
                    `}
                    render={(data) => {
                        const { allMdx } = data;

                        let docs = [];
                        if (allMdx) {
                            const docNames = allMdx.edges
                                .map(({ node }) =>
                                    'sourceInstanceName' in node.parent
                                        ? node.parent.sourceInstanceName
                                        : null
                                )
                                .filter((docName) => docName != null);

                            // Consolidate duplicate doc names
                            docs = [...new Set(docNames)];
                        }

                        return (
                            <BookTileSet>
                                {docs.map((docname, i) => {
                                    let colorIndex = i % AllBookColors.length;

                                    let firstPage = allMdx.edges.find(
                                        (edge) =>
                                            'sourceInstanceName' in edge.node.parent &&
                                            edge.node.parent.sourceInstanceName == docname
                                    );

                                    let documentInfo: IDocumentInfo | undefined =
                                        Books[docname];

                                    return (
                                        <React.Fragment key={i}>
                                            <BookTile
                                                title={documentInfo ? documentInfo.title : docname}
                                                code={docname}
                                                link={firstPage.node.fields.slug}
                                                color={AllBookColors[colorIndex]}
                                            />
                                            <br />
                                        </React.Fragment>
                                    );
                                })}
                            </BookTileSet>
                        );
                    }}
                ></StaticQuery>
            </Layout>
        );
    }
}
