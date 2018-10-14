import React from "react";
import { css } from "emotion";

const rootStyle = css`
    height: 100%;
    display: flex;
    background-color: #333;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ErrorPage = () => {
    return (
        <div className={rootStyle}>
            <p>Oops, looks like something went wrong :(</p>
        </div>
    );
};

export default ErrorPage;
