// vendor
import * as React from "react";
import { css } from "emotion";
import GoogleLogin from "./GoogleLogin";

// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
import GoogleIcon from "../Icons/GoogleIcon";
import { User, View } from "../../types/types";
import { FilterBar } from "./FilterBar";

const menuStyle = css`
    list-style: none;
    display: flex;
    align-items: center;
    background-color: #333;
    font-family: "Roboto Condensed";
    padding: 12px 0;
    h1 {
        color: white;
        font-size: 18px;
        user-select: none;
        font-weight: 500;
    }
    li {
        padding: 0 10px;
        cursor: pointer;
    }
`;

const menuButtonStyle = css`
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    padding-right: 12px;
    background-color: white;
    color: black;
    height: 32px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    span {
        margin-left: 12px;
    }
    svg {
        position: relative;
        left: -4px;
    }
`;

export interface MenuProps {
    user?: User;
    onGoogleSignIn: () => Promise<void>;
    onNavigation: (options: any) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Menu extends React.Component<MenuProps> {
    render() {
        const { user } = this.props;
        return (
            <ul className={menuStyle}>
                <li>
                    <h1>Proverbial</h1>
                </li>
                <li
                    onClick={() => this.props.onNavigation({ view: View.List })}
                >
                    <div className={menuButtonStyle}>
                        <span>
                            <GridIcon size={26} fill={"#333333"} />
                        </span>
                        <p>List</p>
                    </div>
                </li>
                <li
                    onClick={() =>
                        this.props.onNavigation({
                            view: View.Item,
                            random: true
                        })
                    }
                >
                    <div className={menuButtonStyle}>
                        <span>
                            <ShuffleIcon size={26} fill={"#333333"} />
                        </span>
                        <p>Random</p>
                    </div>
                </li>
                <li>
                    <FilterBar onSearch={this.props.onSearch} />
                </li>
                <li className={alignRightStyle}>
                    {user ? (
                        <div className={userInfo}>
                            Welcome back, {user.firstName}!
                        </div>
                    ) : (
                        <GoogleLogin onClick={this.props.onGoogleSignIn}>
                            <GoogleIcon size={32} />
                            <p>Sign In with Google</p>
                        </GoogleLogin>
                    )}
                </li>
            </ul>
        );
    }
}

const alignRightStyle = css`
    margin-left: auto;
`;

const userInfo = css`
    color: white;
`;
