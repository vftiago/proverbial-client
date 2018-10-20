// vendor
import * as React from "react";
import { css } from "emotion";

// local
import GoogleIcon from "../Icons/GoogleIcon";
import MenuButton from "./MenuButton";
import { User, View } from "../../types/types";
import { FilterBar } from "./FilterBar";

export interface MenuProps {
    user?: User;
    initialLoading: boolean;
    onGoogleSignIn: () => Promise<void>;
    onGoogleSignOut: () => Promise<void>;
    onNavigation: (options: any) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Menu extends React.Component<MenuProps> {
    render() {
        const { initialLoading, user } = this.props;
        return (
            <ul className={menuStyle}>
                <li>
                    <h1>Proverbial</h1>
                </li>
                <li>
                    <MenuButton
                        onClick={() =>
                            this.props.onNavigation({ view: View.List })
                        }
                    >
                        <p>List</p>
                    </MenuButton>
                </li>
                <li>
                    <MenuButton
                        onClick={() =>
                            this.props.onNavigation({
                                view: View.Item,
                                random: true
                            })
                        }
                    >
                        <p>Random</p>
                    </MenuButton>
                </li>
                <li>
                    <FilterBar onSearch={this.props.onSearch} />
                </li>
                {!initialLoading && (
                    <li className={alignRightStyle}>
                        {user ? (
                            <div className={userInfoStyle}>
                                <p className={userGreetingStyle}>
                                    Welcome back, {user.firstName}!
                                </p>
                                <MenuButton
                                    onClick={this.props.onGoogleSignOut}
                                >
                                    <p>Sign Out</p>
                                </MenuButton>
                            </div>
                        ) : (
                            <MenuButton onClick={this.props.onGoogleSignIn}>
                                <GoogleIcon size={32} />
                                <p>Sign In with Google</p>
                            </MenuButton>
                        )}
                    </li>
                )}
            </ul>
        );
    }
}

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

const alignRightStyle = css`
    margin-left: auto;
    display: flex;
`;

const userGreetingStyle = css`
    color: white;
    margin-right: 12px;
`;

const userInfoStyle = css`
    display: flex;
    align-items: center;
`;
