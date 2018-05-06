// vendor imports
import * as React from "react";
import { css } from "emotion";

interface AlphabetBarProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const alphabetBar = css`
    font-family: "Roboto Condensed";
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #444;
    padding: 0 44px 12px 44px;
`;

const letterStyle = css`
    margin: 0 10px;
    cursor: pointer;
`;

const alphabet = "abcdefghijklmnopqrstuvwxyz"
    .toUpperCase()
    .split("")
    .map(letter => <span className={letterStyle}>{letter}</span>);

console.log(alphabet);

export class AlphabetBar extends React.Component<AlphabetBarProps> {
    render() {
        return <div className={alphabetBar}>{alphabet}</div>;
    }
}
