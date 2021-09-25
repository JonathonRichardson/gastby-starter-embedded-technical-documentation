import * as React from 'react';

interface IProps {
    href: string;
}

export const AnchorTag: React.FunctionComponent<IProps> = (props) => {
    if (props.children) {
        return (
            <a href={props.href} target="_blank" rel="noopener noreferrer">
                {props.children}
            </a>
        );
    } else {
        return null;
    }
};
