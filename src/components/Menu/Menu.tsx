// vendor
import * as React from "react";
import { css } from "emotion";
import SettingsIcon from "@material-ui/icons/Settings";

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
    onClickSettingsPage: () => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class Menu extends React.Component<MenuProps> {
    state = {
        anchorEl: null
    };

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { initialLoading, user, onClickSettingsPage } = this.props;

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
                                <div className={userAvatarStyle}>
                                    <img
                                        src={user.imageURL}
                                        alt="user profile picture"
                                    />
                                </div>
                                <div className={userGreetingStyle}>
                                    Hello, {user.firstName}!
                                </div>
                                <div
                                    className={settingsButtonStyle}
                                    onClick={onClickSettingsPage}
                                >
                                    <SettingsIcon />
                                </div>
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
    }
`;

const settingsButtonStyle = css`
    display: flex;
    color: white;
    padding: 0 12px;
    cursor: pointer;
`;

const alignRightStyle = css`
    margin-left: auto;
    display: flex;
`;

const userInfoStyle = css`
    display: flex;
    align-items: center;
`;

const userAvatarStyle = css`
    margin-right: 12px;
    height: 32px;
    img {
        border-radius: 50%;
        height: 32px;
        width: 32px;
    }
`;

const userGreetingStyle = css`
    color: white;
`;
