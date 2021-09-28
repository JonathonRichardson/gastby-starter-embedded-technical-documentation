//#region Imports
import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider, Global, css } from '@emotion/react';
import { lightTheme, darkTheme } from './index';
import { Header } from '../Header';
import { baseStyles } from '../styles/GlobalStyles';
//#endregion

interface IProps {
    location: string;

    docName: string;
    docTitle: string;
}

interface IState {
    isDarkThemeActive: boolean;
}

export class ThemeProvider extends React.Component<IProps, IState> {
    state = {
        isDarkThemeActive: false,
    };

    componentDidMount() {
        this.retrieveActiveTheme();
    }

    retrieveActiveTheme = () => {
        const isDarkThemeActive = JSON.parse(window.localStorage.getItem('isDarkThemeActive'));

        this.setState({ isDarkThemeActive });
    };

    toggleActiveTheme = () => {
        this.setState((prevState) => ({ isDarkThemeActive: !prevState.isDarkThemeActive }));

        window.localStorage.setItem(
            'isDarkThemeActive',
            JSON.stringify(!this.state.isDarkThemeActive)
        );
    };

    render() {
        const { children, location } = this.props;

        const { isDarkThemeActive } = this.state;

        const currentActiveTheme = isDarkThemeActive ? darkTheme : lightTheme;

        return (
            <div>
                <Global styles={[baseStyles]} />
                <Header
                    location={location}
                    isDarkThemeActive={isDarkThemeActive}
                    toggleActiveTheme={this.toggleActiveTheme}
                    docName={this.props.docName}
                    docTitle={this.props.docTitle}
                />
                <EmotionThemeProvider theme={currentActiveTheme}>{children}</EmotionThemeProvider>
            </div>
        );
    }
}
