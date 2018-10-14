// vendor imports
import * as React from "react";
import { css } from "emotion";
// local imports
import { List } from "./List/List";
// types
import { Options, Page, Proverb } from "../../types/types";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";

interface ContentProps {
    list: Proverb[];
    currentPage: Page;
    errorMessage: string | undefined;
    onNavigation: (options: Options) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const contentStyle = css`
    background-color: #222;
    color: #ffd;
    font-family: "Quando";
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
        const { currentPage } = this.props;

        let content;

        switch (currentPage) {
            case Page.LoadingPage:
                content = <LoadingPage />;
                break;
            case Page.ErrorPage:
                content = <ErrorPage />;
                break;
            default:
                content = (
                    <List
                        list={this.props.list}
                        onNavigation={this.props.onNavigation}
                    />
                );
                break;
        }

        return <div className={contentStyle}>{content}</div>;
    }
}
