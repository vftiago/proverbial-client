// vendor imports
import * as React from "react";
import { css } from "emotion";
// local imports
import stringToRgb from "../../../../utils/stringToRgb";
// types
import { Options, Proverb, View } from "../../../../types/types";

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
        font-size: 13px;
        cursor: pointer;
    }
`;

const singleItemStyle = css`
    ${itemStyle};
    transition: 0.5s ease-in-out;
    span {
        font-size: 32px;
    }
`;

interface ItemProps {
    el: Proverb;
    onNavigation: (options: Options) => void;
    proverbCount: number;
}

const Item: React.SFC<ItemProps> = props => {
    return (
        <li
            className={props.proverbCount === 1 ? singleItemStyle : itemStyle}
            onClick={() => {
                props.onNavigation({ view: View.Item, id: props.el._id });
            }}
            style={{ background: stringToRgb(props.el._id.toString()) }}
        >
            <span>{props.el.text}</span>
        </li>
    );
};

export default Item;
