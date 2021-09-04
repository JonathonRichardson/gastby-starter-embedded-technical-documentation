import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { RightSideBarDataQuery } from '../../graphql-types';
// import Link from './link';
import config from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';

export const RightSidebar = ({ location: string }) => (
    <StaticQuery
        query={graphql`
            query RightSideBarData {
                allMdx {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            tableOfContents
                        }
                    }
                }
            }
        `}
        render={(props: RightSideBarDataQuery) => {
            let { allMdx } = props;
            let navItems = [];

            let finalNavItems;

            if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
                const navItems = allMdx.edges.map((item, index) => {
                    let innerItems;

                    if (item !== undefined) {
                        if (
                            item.node.fields.slug === location.pathname ||
                            config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
                        ) {
                            if (item.node.tableOfContents.items) {
                                innerItems = item.node.tableOfContents.items.map(
                                    (innerItem, index) => {
                                        const itemId = innerItem.title
                                            ? innerItem.title.replace(/\s+/g, '').toLowerCase()
                                            : '#';

                                        return (
                                            <ListItem
                                                key={index}
                                                to={`#${itemId}`}
                                                level={1}
                                                active={false}
                                                className=""
                                            >
                                                {innerItem.title}
                                            </ListItem>
                                        );
                                    }
                                );
                            }
                        }
                    }
                    if (innerItems) {
                        finalNavItems = innerItems;
                    }
                });
            }

            if (finalNavItems && finalNavItems.length) {
                return (
                    <Sidebar>
                        <ul className={'rightSideBarUL'}>
                            <li className={'rightSideTitle'}>CONTENTS</li>
                            {finalNavItems}
                        </ul>
                    </Sidebar>
                );
            } else {
                return (
                    <Sidebar>
                        <ul></ul>
                    </Sidebar>
                );
            }
        }}
    />
);
