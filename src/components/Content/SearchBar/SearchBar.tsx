// vendor imports
import * as React from "react";
import { css } from "emotion";
// types
import SearchIcon from "../../Icons/SearchIcon";

interface SearchBarProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const searchBar = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #444;
    padding: 12px 44px;
    input {
        height: 20px;
        flex-grow: 0;
        font-size: 16px;
        font-family: "Roboto Condensed";
        min-width: 400px;
        border-radius: 3px;
        padding: 6px;
        border: none;
        ::-webkit-input-placeholder {
            color: #777;
        }
        :-ms-input-placeholder {
            color: #777;
        }
        ::-moz-placeholder {
            color: #777;
            opacity: 1;
        }
        :-moz-placeholder {
            color: #777;
            opacity: 1;
        }
    }
    svg {
        position: relative;
        right: 33px;
    }
`;

export class SearchBar extends React.Component<SearchBarProps> {
    render() {
        return (
            <div className={searchBar}>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={this.props.onSearch}
                />
                <SearchIcon fill="#777" size={32} />
            </div>
        );
    }
}
