// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";
import GoogleIcon from "../Icons/GoogleIcon";
import { Options, View } from "../../types";
import { FilterBar } from "./FilterBar";

const verticalCenter = css`
    display: flex;
    align-items: center;
`;

const menuStyle = css`
    ${verticalCenter};
    color: white;
    background-color: #222222;
    font-family: "Roboto Condensed";
    padding: 12px 0;
    justify-content: space-between;

    h1 {
        font-size: 18px;
        user-select: none;
    }
    ul {
        list-style: none;
        display: flex;
        ${verticalCenter};
        li {
            padding: 0 12px;
            ${verticalCenter};
            cursor: pointer;
        }
    }
`;

const leftSideMenu = css``;

const rightSideMenu = css`
    align-self: flex-end;
`;

const googleSignInButtonStyle = css`
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    font-family: "Roboto";
    padding-right: 12px;
    background-color: white;
    color: rgba(0, 0, 0, 0.54);
    height: 32px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    svg {
        position: relative;
        left: -4px;
    }
`;

const rightItemStyle = css`
    align-self: flex-end;
`;

export interface MenuProps {
    id: number;
    onNavigation: (options: Options) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Menu extends React.Component<MenuProps> {
    render() {
        return (
            <div className={menuStyle}>
                <ul className={leftSideMenu}>
                    <li>
                        <h1>Proverbial</h1>
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation({ view: View.List })
                        }
                    >
                        <GridIcon size={26} fill={"white"} />
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation({
                                view: View.Item,
                                random: true
                            })
                        }
                    >
                        <ShuffleIcon size={26} fill={"white"} />
                    </li>
                    <li>
                        <FilterBar onSearch={this.props.onSearch} />
                    </li>
                </ul>
                <ul className={rightSideMenu}>
                    <li className={rightItemStyle}>
                        <div className={googleSignInButtonStyle}>
                            <GoogleIcon />
                            <p>Sign in with Google</p>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
