//#region Imports
import React from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from './theme/ThemeProvider';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import { RightSidebar } from './RightSidebar';
import config from '../../config.js';
//#endregion Imports

const Wrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.background};

    .sideBarUL li a {
        color: ${({ theme }) => theme.colors.text};
    }

    .sideBarUL .item > a:hover {
        background-color: #1ed3c6;
        color: #fff !important;

        /* background: #F8F8F8 */
    }

    @media only screen and (max-width: 767px) {
        display: block;
    }
`;

const Content = styled('main')`
    display: flex;
    flex-grow: 1;
    margin: 0px 88px;
    padding-top: 3rem;
    background: ${({ theme }) => theme.colors.background};

    table tr {
        background: ${({ theme }) => theme.colors.background};
    }

    @media only screen and (max-width: 1023px) {
        padding-left: 0;
        margin: 0 10px;
        padding-top: 3rem;
    }
`;

const MaxWidth = styled('div')`
    @media only screen and (max-width: 50rem) {
        width: 100%;
        position: relative;
    }
`;

const LeftSideBarWidth = styled('div')`
    width: 298px;
`;

const RightSideBarWidth = styled('div')`
    width: 224px;
`;

interface IProps {
    location: string;
    hideLeftNav?: boolean;
    docName: string;
    docTitle: string;
}

export const Layout: React.FunctionComponent<IProps> = (props) => {
    let { location, hideLeftNav, docName, docTitle } = props;
    return (
        <ThemeProvider location={location} docName={docName} docTitle={docTitle}>
            <MDXProvider components={mdxComponents}>
                <Wrapper>
                    {!hideLeftNav && (
                        <LeftSideBarWidth className={'hiddenMobile'}>
                            <Sidebar location={location} docName={docName} docTitle={docTitle} />
                        </LeftSideBarWidth>
                    )}
                    {config.sidebar.title ? (
                        <div
                            className={'sidebarTitle sideBarShow'}
                            dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
                        />
                    ) : null}
                    <Content>
                        <MaxWidth>{props.children}</MaxWidth>
                    </Content>
                    <RightSideBarWidth className={'hiddenMobile'}>
                        <RightSidebar location={location} />
                    </RightSideBarWidth>
                </Wrapper>
            </MDXProvider>
        </ThemeProvider>
    );
};
