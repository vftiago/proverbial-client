// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import stringToRgb from "../../../utils/stringToRgb";
// types
import { Proverb, View } from "../../../../types";

export interface ItemProps {
	lang: string;
	db: AxiosInstance;
	text: string;
	onViewSwitch: (view: View, id?: number) => void;
}

interface State {
	history: string[];
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
	state: State = {
		history: [""]
	};

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
				style={{ "background-color": stringToRgb(this.props.text) }}
			>
				<p>{this.props.text}</p>
			</div>
		);
	}
}
