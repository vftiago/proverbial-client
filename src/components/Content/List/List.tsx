// vendor imports
import * as React from "react";
import { css } from "emotion";
// local imports
import randRgb from "../../../utils/randRgb";
// types
import { Options, Proverb } from "../../../types";
import Item from "./Item/Item";

interface ListProps {
    list: Proverb[];
    onNavigation: (options: Options) => void;
}

const list = css`
    width: 100%;
    flex-direction: column;
    flex: 1 0 auto;
    display: flex;
    ul {
        list-style: none;
        display: flex;
        flex: 1 0 auto;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0;
        margin: 0;
    }
`;

export class List extends React.Component<ListProps> {
    componentDidMount() {
        console.log("List Mounted");
    }

    format(arr: Proverb[]): JSX.Element[] {
        return arr.map(el => (
            <Item
                el={el}
                onNavigation={this.props.onNavigation}
                proverbCount={this.props.list.length}
            />
        ));
    }

    render() {
        return (
            <div className={list}>
                <ul>{this.format(this.props.list)}</ul>
            </div>
        );
    }
}
