import React from 'react';
import Tree, { IRawEdge } from './Tree';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ExternalLink } from 'react-feather';
import config from '../../../config';
import { LeftSideBarDataQuery } from '../../../graphql-types';

interface IStyledListItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    level: number;
    to: string;
}

const StyledListItem: React.FunctionComponent<IStyledListItemProps> = (props) => {
    const { className, active, level, ...extraProps } = props;
    return (
        <li className={className}>
            <a href={props.to} {...extraProps} target="_blank" rel="noopener noreferrer">
                {props.children}
            </a>
        </li>
    );
};

// eslint-disable-next-line no-unused-vars
const ListItem = styled(StyledListItem)`
    list-style: none;

    a {
        color: #5c6975;
        text-decoration: none;
        font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
        padding: 0.45rem 0 0.45rem ${(props) => 2 + (props.level || 0) * 1}rem;
        display: block;
        position: relative;

        &:hover {
            color: #1ed3c6 !important;
        }

        ${(props) =>
            props.active &&
            `
      // color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
            float: right;
            margin-right: 1rem;
        }
    }
`;

const Sidebar = styled('aside')`
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: fixed;
    padding-left: 0px;
    position: -webkit-sticky;
    position: -moz-sticky;
    position: sticky;
    top: 0;
    padding-right: 0;
    box-shadow: -1px 0px 4px 1px rgba(175, 158, 232, 0.4);

    @media only screen and (max-width: 1023px) {
        width: 100%;
        /* position: relative; */
        height: 100vh;
    }

    @media (min-width: 767px) and (max-width: 1023px) {
        padding-left: 0;
    }

    @media only screen and (max-width: 767px) {
        padding-left: 0px;
        height: auto;
    }
`;

const Divider = styled((props) => (
    <li {...props}>
        <hr />
    </li>
))`
    list-style: none;
    padding: 0.5rem 0;

    hr {
        margin: 0;
        padding: 0;
        border: 0;
        border-bottom: 1px solid #ede7f3;
    }
`;

const SidebarLayout = ({ location, docName, docTitle }) => (
    <StaticQuery
        query={graphql`
            query LeftSideBarData {
                allMdx {
                    edges {
                        node {
                            fields {
                                slug
                                title
                            }
                            frontmatter {
                                collapsedByDefault
                                navOrder
                                date
                            }
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
        `}
        render={(data: LeftSideBarDataQuery) => {
            let { allMdx } = data;

            let edges: IRawEdge[] = allMdx.edges
                .filter((x) => x.node.fields.slug)
                .map((x) => x as IRawEdge);

            return (
                <Sidebar>
                    <div className={'sidebarTitle hiddenMobile'}>{docTitle}</div>
                    <ul className={'sideBarUL'}>
                        <Tree edges={edges} docName={docName} />
                        {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
                        {config.sidebar.links.map((link, key) => {
                            if (link.link !== '' && link.text !== '') {
                                return (
                                    <ListItem key={key} to={link.link} level={0}>
                                        {link.text}
                                        <ExternalLink size={14} />
                                    </ListItem>
                                );
                            }
                        })}
                    </ul>
                </Sidebar>
            );
        }}
    />
);

export default SidebarLayout;
