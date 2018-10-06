// vendor imports
import * as React from "react";
import { css } from "emotion";
// local imports
import { List } from "./List/List";
// types
import { Options, Proverb } from "../../types/types";

interface ContentProps {
    list: Proverb[];
    onNavigation: (options: Options) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const content = css`
    background-color: #222;
    color: #ffd;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export class Content extends React.Component<ContentProps> {
    componentDidMount() {
        console.log("Content Mounted");
    }

    render() {
        return (
            <div className={content}>
                <List
                    list={this.props.list}
                    onNavigation={this.props.onNavigation}
                />
            </div>
        );
    }
}
