import React from "react";
import { css } from "emotion";

const rootStyle = css`
    box-sizing: border-box;
    background-color: pink;
    font-family: "Roboto Condensed";
    padding: 12px;
    display: flex;
    width: 100%;
`;

const LoadingPage = () => {
    return <div className={rootStyle}>Loading</div>;
};

export default LoadingPage;
