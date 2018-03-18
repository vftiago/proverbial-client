import * as React from "react";
import { css } from "emotion";
import axios from "axios";

import { Response } from "../../../src/types";
import { Item } from "./Item/Item";
import { List } from "./List/List";

export interface ContentProps {
	view: string;
}

const content = css`
	background-color: #222;
	color: wheat;
	text-shadow: 1px 1px 1px black;
	padding: 30px;
	font-size: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 auto;
`;

export class Content extends React.Component<ContentProps> {
	render() {
		return (
			<div className={content}>
				{this.props.view === "item" ? <Item /> : <List />}
			</div>
		);
	}
}
