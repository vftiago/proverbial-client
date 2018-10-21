// vendor
import * as React from "react";
import { css } from "emotion";

// local
import GoogleIcon from "../Icons/GoogleIcon";
import MenuButton from "./MenuButton";
import { User } from "../../types/types";
import { FilterBar } from "./FilterBar";
import UserBar from "./UserBar";

export interface MenuProps {
    user?: User;
    initialLoading: boolean;
    onGoogleSignIn: () => Promise<void>;
    onGoogleSignOut: () => Promise<void>;
    onClickRandomProverb: () => Promise<void>;
    onClickListProverbs: () => Promise<void>;
    onClickSettingsPage: () => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class Menu extends React.Component<MenuProps> {
    render() {
        const {
            initialLoading,
            user,
            onGoogleSignOut,
            onClickSettingsPage,
            onClickRandomProverb,
            onClickListProverbs
        } = this.props;

        return (
            <ul className={menuStyle}>
                <li>
                    <h1>Proverbial</h1>
                </li>
                <li>
                    <MenuButton onClick={onClickListProverbs}>
                        <p>List</p>
                    </MenuButton>
                </li>
                <li>
                    <MenuButton onClick={onClickRandomProverb}>
                        <p>Random</p>
                    </MenuButton>
                </li>
                <li>
                    <FilterBar onSearch={this.props.onSearch} />
                </li>
                {!initialLoading && (
                    <li className={alignRightStyle}>
                        {user ? (
                            <UserBar
                                user={user}
                                onClickSettingsPage={onClickSettingsPage}
                                onGoogleSignOut={onGoogleSignOut}
                            />
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

// #region styles
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
    }
`;

const alignRightStyle = css`
    margin-left: auto;
    display: flex;
`;
// #endregion styles
