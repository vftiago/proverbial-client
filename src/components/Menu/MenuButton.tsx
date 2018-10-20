// vendor
import * as React from "react";
import { css } from "emotion";

const menuButtonStyle = css`
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    padding: 0 12px;
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

export interface MenuButtonProps {
    onClick: () => void;
}

export default class MenuButton extends React.Component<MenuButtonProps> {
    render() {
        const { children, onClick } = this.props;

        return (
            <div className={menuButtonStyle} onClick={onClick}>
                {children}
            </div>
        );
    }
}
