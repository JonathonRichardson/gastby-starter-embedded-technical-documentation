import 'styled-components';
//import { DefaultTheme } from 'styled-components/native';

interface IPallete {
    background: string;
    heading: string;
    text: string;
    preFormattedText: string;
    link: string;
}

interface ITheme {
    fonts: {
        mono: string;
    };
    colors: IPallete;
}

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {}
}

import '@emotion/styled';
declare module '@emotion/styled' {
    export interface Theme extends ITheme {}
}

import '@emotion/react';
declare module '@emotion/react' {
    export interface Theme extends ITheme {}
}

const baseTheme = {
    fonts: {
        mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
    },
};

const lightTheme: ITheme = {
    ...baseTheme,
    colors: {
        background: '#fff',
        heading: '#000',
        text: '#3B454E',
        preFormattedText: 'rgb(245, 247, 249)',
        link: '#1000EE',
    },
};

const darkTheme: ITheme = {
    ...baseTheme,
    colors: {
        background: '#001933',
        heading: '#fff',
        text: '#fff',
        preFormattedText: '#000',
        link: '#1ED3C6',
    },
};

export { lightTheme, darkTheme };
