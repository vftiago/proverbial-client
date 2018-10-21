// vendor imports
import * as React from "react";
import { css } from "emotion";
// types
import SearchIcon from "../Icons/SearchIcon";

interface FilterBarProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const filterBarStyle = css`
    display: flex;
    align-items: center;
    margin-right: -28px;
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
        right: 28px;
    }
`;

export class FilterBar extends React.Component<FilterBarProps> {
    render() {
        return (
            <div className={filterBarStyle}>
                <input
                    type="text"
                    placeholder="Filter"
                    onChange={this.props.onSearch}
                />
                <SearchIcon fill="#777" size={24} />
            </div>
        );
    }
}
