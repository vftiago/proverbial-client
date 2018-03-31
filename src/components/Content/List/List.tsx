// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import randRgb from "../../../utils/randRgb";
// types
import { Proverb, View } from "../../../types";
import SearchIcon from "../../Icons/SearchIcon";

interface ListProps {
	count: number;
	lang: string;
	list: Proverb[];
	onViewSwitch: (view: View, id?: number) => void;
}

interface State {
	formattedList: JSX.Element[];
}

const filter = css`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #444;
	padding: 12px 44px;
	input {
		height: 20px;
		flex-grow: 0;
		font-size: 16px;
		font-family: "Roboto Condensed";
		min-width: 66%;
		border-radius: 3px;
		padding: 6px;
		border: none;
		::-webkit-input-placeholder {
			color: #777;
		}
		:-ms-input-placeholder {
			color: #777;
		}
		::-moz-placeholder {
			color: #777;
			opacity: 1;
		}
		:-moz-placeholder {
			color: #777;
			opacity: 1;
		}
	}
	svg {
		position: relative;
		right: 33px;
	}
`;

const list = css`
	width: 100%;
	ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
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
		formattedList: undefined
	};

	filterList(e: React.ChangeEvent<HTMLInputElement>): void {
		console.log(this);
		const list = this.props.list.filter(
			item =>
				item.text.toLowerCase().search(e.target.value.toLowerCase()) !==
				-1
		);
		this.setState({ formattedList: this.format(list) });
	}

	async update() {
		const formattedList = this.format(this.props.list);
		this.setState({ formattedList });
	}

	async componentDidMount() {
		await this.update();
		console.log("List Mounted");
	}

	format(arr: Proverb[]): JSX.Element[] {
		return arr.map(el => (
			<li
				onClick={() => {
					this.props.onViewSwitch(View.Item, el.id);
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
				<div className={filter}>
					<input
						type="text"
						placeholder="Search"
						onChange={this.filterList.bind(this)}
					/>
					<SearchIcon fill="#777" size={32} />
				</div>
				<ul>{this.state.formattedList}</ul>
			</div>
		);
	}
}
