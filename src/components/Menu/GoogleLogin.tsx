import * as React from "react";
import { css } from "emotion";
interface GoogleLoginProps {
    onClick: () => Promise<void>;
}

export default class GoogleLogin extends React.Component<GoogleLoginProps, {}> {
    render() {
        const { children, onClick } = this.props;
        return (
            <div className={menuButtonStyle} onClick={onClick}>
                {children}
            </div>
        );
    }
}

const menuButtonStyle = css`
    display: flex;
    height: 32px;
    align-items: center;
    border-radius: 3px;
    font-family: "Roboto Condensed";
    font-size: 13px;
    padding: 0 12px 0 8px;
    background-color: white;
    color: black;
    justify-content: space-between;
    cursor: pointer;
`;
