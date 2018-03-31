// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import stringToRgb from "../../../utils/stringToRgb";
// types
import { Proverb, View } from "../../../types";

interface ListProps {
	count: number;
	lang: string;
	list: Proverb[];
	onViewSwitch: (view: View, id?: number) => void;
}

interface State {
	list: Proverb[];
}

const list = css`
	ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		height: 100%;
		padding: 0;
		margin: 0;
		li {
			text-align: center;
			max-width: 50%;
			height: 200px;
			width: 200px;
			display: flex;
			flex: 1 1 auto;
			align-items: center;
			justify-content: center;
			padding: 10px;
			span {
				font-size: 14px;
				cursor: pointer;
			}
		}
	}
`;

export class List extends React.Component<ListProps> {
	state: State = {
		list: undefined
	};

	async update() {
		const list = this.format(this.props.list);
		this.setState({ list });
	}

	async componentDidMount() {
		this.update();
		console.log("List Mounted");
	}

	format(arr: Proverb[]) {
		return arr.map(el => (
			<li
				onClick={() => {
					this.props.onViewSwitch(View.Item, el.id);
				}}
				style={{ "background-color": stringToRgb(el.text) }}
				key={el.id}
			>
				<span>{el.text}</span>
			</li>
		));
	}

	render() {
		return (
			<div className={list}>
				<ul>{this.state.list}</ul>
			</div>
		);
	}
}
