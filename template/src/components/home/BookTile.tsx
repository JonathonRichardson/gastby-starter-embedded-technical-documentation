//#region Imports
import styled from '@emotion/styled';
import React from 'react';
import { Link } from '../Link';
import { BookSVG } from './BookTile.svg';
//#endregion

interface IProps {
    title: string;
    code: string;
    link: string;
    color: React.ComponentProps<typeof BookSVG>['color'];
}

const StyledDivForBook = styled.div`
    // padding: 15px;
    // margin: 5px;
    // border: 1px solid lightgrey;
    // border-radius: 10px;
`;

export class BookTile extends React.Component<IProps> {
    render() {
        let { props } = this;

        return (
            <StyledDivForBook>
                <Link to={`/${props.code}${props.link}`}>
                    <BookSVG title={props.title} color={props.color} />
                </Link>
            </StyledDivForBook>
        );
    }
}

const StyledDivContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export class BookTileSet extends React.Component<{}> {
    render() {
        return <StyledDivContainer>{this.props.children}</StyledDivContainer>;
    }
}
