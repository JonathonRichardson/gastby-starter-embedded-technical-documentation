import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import { Link } from '../Link';
import { INode } from './Tree.common';

interface IProps {
    className?: string;
    setCollapsed: (url: string) => void;
    collapsedMap: { [key: string]: boolean };
    url: string;
    title: string;
    items: INode[];
}

export const TreeNode: React.FunctionComponent<IProps> = (props) => {
    let { className, setCollapsed, collapsedMap, url, title, items, ...rest } = props;
    const isCollapsed = collapsedMap[url];

    const collapse = () => {
        setCollapsed(url);
    };

    const hasChildren = items && items.length !== 0;

    let location;

    if (typeof document != 'undefined') {
        location = document.location;
    }
    const active =
        location &&
        (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

    const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

    return (
        <li className={calculatedClassName}>
            {title && (
                <Link to={url}>
                    {title}
                    {!config.sidebar.frontLine && title && hasChildren ? (
                        <button onClick={collapse} aria-label="collapse" className="collapser">
                            {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
                        </button>
                    ) : null}
                </Link>
            )}

            {!isCollapsed && hasChildren ? (
                <ul>
                    {items.map((item, index) => {
                        let url = item.urlSlug;
                        if (item.documentName) {
                            url = `/${item.documentName}${url}`;
                        }
                        return (
                            <TreeNode
                                key={url + index.toString()}
                                setCollapsed={setCollapsed}
                                collapsedMap={collapsedMap}
                                items={item.children}
                                url={url}
                                title={item.title}
                            />
                        );
                    })}
                </ul>
            ) : null}
        </li>
    );
};
