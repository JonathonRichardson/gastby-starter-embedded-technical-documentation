import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql, Link as GatsbyLink } from 'gatsby';
import { Link } from './Link';
import { useFlexSearch } from 'react-use-flexsearch';
import config from '../../config.js';
import { DarkModeSwitch } from './DarkModeSwitch';

const help = require('./images/help.svg');

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];

if (isSearchEnabled && config.header.search.indexName) {
    searchIndices.push({
        name: `${config.header.search.indexName}`,
        title: `Results`,
        hitComp: `PageHit`,
    });
}

import Sidebar from './sidebar';

function myFunction() {
    var x = document.getElementById('navbar');

    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}

interface IStyledBgDivProps extends React.HTMLAttributes<HTMLDivElement> {
    isDarkThemeActive: boolean;
}

const StyledBgDivComponent: React.FunctionComponent<IStyledBgDivProps> = (props) => {
    let { isDarkThemeActive, ...extraProps } = props;
    return <div {...extraProps}>{props.children}</div>;
};

const StyledBgDiv = styled(StyledBgDivComponent)`
    height: 60px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #f8f8f8;
    position: relative;
    display: none;
    background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};

    @media (max-width: 767px) {
        display: block;
    }
`;

interface IProps {
    location: string;
    isDarkThemeActive: boolean;
    docName: string;
    docTitle: string;
    toggleActiveTheme: () => void;
}

export const Header: React.FunctionComponent<IProps> = (props) => {
    let { location, isDarkThemeActive, toggleActiveTheme } = props;
    return (
        <StaticQuery
            query={graphql`
                query HeaderTitleQuery {
                    site {
                        siteMetadata {
                            headerTitle
                            helpUrl
                            logo {
                                link
                                image
                            }
                        }
                    }
                    localSearchPages {
                        index
                        store
                    }
                }
            `}
            render={(data) => {
                const logoImg = require('./images/logo.svg');
                const {
                    site: {
                        siteMetadata: { helpUrl, logo, headerTitle },
                    },
                    localSearchPages: { index, store },
                } = data;

                const [query, setQuery] = React.useState('');

                let options = {};

                let results = useFlexSearch(query, index, store, options);

                console.log('query results', results);

                return (
                    <div className={'navBarWrapper'}>
                        <nav className={'navBarDefault'}>
                            <div className={'navBarHeader'}>
                                <Link to={'/'} className={'navBarBrand'}>
                                    <img
                                        className={'img-responsive displayInline'}
                                        src={logo.image !== '' ? logo.image : logoImg}
                                        alt={'logo'}
                                    />
                                </Link>

                                <h1
                                    style={{
                                        color: 'white',
                                        fontWeight: 300,
                                    }}
                                >
                                    | {headerTitle}
                                </h1>
                            </div>

                            <div id="navbar" className={'topnav'}>
                                <div className={'visibleMobile'}>
                                    <Sidebar
                                        location={location}
                                        docName={props.docName}
                                        docTitle={props.docTitle}
                                    />
                                    <hr />
                                </div>
                                <ul className={'navBarUL navBarNav navBarULRight'}>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                        }}
                                    />
                                    {results && results.length > 0 && (
                                        <li
                                            style={{
                                                position: 'absolute',
                                                background: 'white',
                                                top: '53px',
                                                border: '1px solid black',
                                                listStyle: 'circle',
                                            }}
                                        >
                                            {results.map((result) => {
                                                let url = result.path;
                                                if (result.documentName) {
                                                    url = `${result.documentName}/${url}`;
                                                }
                                                return (
                                                    <li className="search-result" key={result.id}>
                                                        <GatsbyLink to={`/${url}`}>
                                                            {result.title}
                                                        </GatsbyLink>
                                                    </li>
                                                );
                                            })}
                                        </li>
                                    )}
                                    {/* {helpUrl !== '' ? (
                                    <li>
                                        <a href={helpUrl}>
                                            <img src={help} alt={'Help icon'} />
                                        </a>
                                    </li>
                                ) : null} */}
                                    <li>
                                        <DarkModeSwitch
                                            isDarkThemeActive={isDarkThemeActive}
                                            toggleActiveTheme={toggleActiveTheme}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
                            <div className={'navBarDefault removePadd'}>
                                <span
                                    onClick={myFunction}
                                    className={'navBarToggle'}
                                    onKeyDown={myFunction}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <span className={'iconBar'}></span>
                                    <span className={'iconBar'}></span>
                                    <span className={'iconBar'}></span>
                                </span>
                            </div>
                        </StyledBgDiv>
                    </div>
                );
            }}
        />
    );
};
