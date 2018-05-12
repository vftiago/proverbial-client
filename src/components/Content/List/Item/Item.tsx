// vendor imports
import * as React from "react";
import { css } from "emotion";
// local imports
import stringToRgb from "../../../../utils/stringToRgb";
// types
import { Options, Proverb, View } from "../../../../types";

const itemStyle = css`
    text-align: center;
    min-height: 200px;
    width: 200px;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    padding: 12px;
    line-height: 1.4;
    font-size: 13px;
    span {
        cursor: pointer;
    }
`;

const textStyle = css`
    font-size: 13px;
`;

const singleItemTextStyle = css`
    font-size: 32px;
`;

interface ItemProps {
    el: Proverb;
    onNavigation: (options: Options) => void;
    proverbCount: number;
}

const Item: React.SFC<ItemProps> = props => {
    return (
        <li
            className={itemStyle}
            onClick={() => {
                props.onNavigation({ view: View.Item, id: props.el._id });
            }}
            style={{ "background-color": stringToRgb(props.el.text) }}
        >
            <span
                className={
                    props.proverbCount === 1 ? singleItemTextStyle : textStyle
                }
            >
                {props.el.text}
            </span>
        </li>
    );
};

export default Item;
