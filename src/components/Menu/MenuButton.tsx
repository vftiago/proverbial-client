// vendor
import * as React from "react";
import { css } from "emotion";

const menuButtonStyle = css`
    display: flex;
    height: 32px;
    align-items: center;
    border-radius: 3px;
    font-family: "Roboto";
    font-size: 14px;
    padding: 0 12px 0 8px;
    background-color: white;
    color: black;
    justify-content: space-between;
    cursor: pointer;
`;

export interface MenuButtonProps {
    icon: JSX.Element;
    label: string;
    onClick: () => void;
}

export class MenuButton extends React.Component<MenuButtonProps> {
    render() {
        return (
            <div
                className={menuButtonStyle}
                onClick={() => this.props.onClick()}
            >
                {this.props.icon}
                &nbsp;
                {this.props.label}
            </div>
        );
    }
}
