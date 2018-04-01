// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import randRgb from "../../../utils/randRgb";
// types
import { Proverb } from "../../../types";

interface ListProps {
	count: number;
	lang: string;
	list: Proverb[];
	onNavigation: (id?: number) => void;
}

interface State {
	formattedList: JSX.Element[];
}

const list = css`
	width: 100%;
	flex-direction: column;
	flex: 1 0 auto;
	display: flex;
	ul {
		list-style: none;
		display: flex;
		flex: 1 0 auto;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		margin: 0;
		li {
			text-align: center;
			min-height: 200px;
			width: 200px;
			display: flex;
			flex: 1 1 auto;
			align-items: center;
			justify-content: center;
			padding: 12px;
			line-height: 1.4;
			span {
				font-size: 13px;
				cursor: pointer;
			}
		}
	}
`;

export class List extends React.Component<ListProps> {
	async componentDidMount() {
		console.log("List Mounted");
	}

	format(arr: Proverb[]): JSX.Element[] {
		return arr.map(el => (
			<li
				onClick={() => {
					if (this.props.list.length > 1) {
						this.props.onNavigation(el.id);
					}
				}}
				style={{ "background-color": randRgb() }}
				key={el.id}
			>
				<span>{el.text}</span>
			</li>
		));
	}

	render() {
		return (
			<div className={list}>
				<ul>{this.format(this.props.list)}</ul>
			</div>
		);
	}
}
