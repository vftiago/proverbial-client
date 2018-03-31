// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import randRgb from "../../../utils/randRgb";
// types
import { Proverb, View } from "../../../types";

export interface ItemProps {
	text: string;
	onViewSwitch: (view: View, id?: number) => void;
}

const item = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	font-size: 28px;
	p {
		padding: 30px;
		cursor: pointer;
		user-select: none;
	}
`;

export class Item extends React.Component<ItemProps> {
	componentDidMount() {
		console.log("Item Mounted");
	}

	render() {
		return (
			<div
				className={item}
				onClick={() => {
					this.props.onViewSwitch(View.Item);
				}}
				style={{ "background-color": randRgb() }}
			>
				<p>{this.props.text}</p>
			</div>
		);
	}
}
