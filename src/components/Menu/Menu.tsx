// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";
import randInt from "../../utils/randInt";

const verticalCenter = css`
    display: flex;
    align-items: center;
`;

const menu = css`
    ${verticalCenter};
    color: white;
    background-color: #222222;
    font-family: "Roboto Condensed";
    padding: 10px;
    h1 {
        font-size: 18px;
        margin-right: 24px;
        user-select: none;
    }
    ul {
        ${verticalCenter};
        list-style: none;
        li {
            cursor: pointer;
            ${verticalCenter};
            padding: 0 12px;
            span {
                padding: 0 12px;
                font-size: 18px;
            }
        }
    }
`;

export interface MenuProps {
    id: number;
    onNavigation: (id?: number) => void;
}

export class Menu extends React.Component<MenuProps> {
    render() {
        return (
            <div className={menu}>
                <h1>Proverbial</h1>
                <ul>
                    <li onClick={() => this.props.onNavigation()}>
                        <GridIcon size={28} fill={"white"} />
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation(this.props.id - 1)
                        }
                    >
                        <LeftIcon size={18} fill={"white"} />
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation(this.props.id + 1)
                        }
                    >
                        <RightIcon size={18} fill={"white"} />
                    </li>
                    <li onClick={() => this.props.onNavigation(99999)}>
                        <ShuffleIcon size={28} fill={"white"} />
                    </li>
                </ul>
            </div>
        );
    }
}
