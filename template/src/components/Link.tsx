import React, { HTMLAttributes } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';

interface IProps extends HTMLAttributes<HTMLAnchorElement> {
    to: string;
}

export const Link: React.FunctionComponent<IProps> = ({ to, children, ...extraProps }) => {
    if (to && isAbsoluteUrl(to)) {
        return (
            <a href={to} {...extraProps}>
                {children}
            </a>
        );
    } else {
        return (
            <GatsbyLink to={to} {...extraProps}>
                {children}
            </GatsbyLink>
        );
    }
};
