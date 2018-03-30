// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import stringToRgb from "../../../utils/stringToRgb";
// types
import { Proverb, View } from "../../../../types";

interface ListProps {
	db: AxiosInstance;
	count: number;
	lang: string;
	onViewSwitch: (view: View, id?: number) => void;
}

interface State {
	list: Proverb[];
}

const list = css`
	font-size: 13px;
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
		}
	}
`;

export class List extends React.Component<ListProps> {
	state: State = {
		list: undefined
	};

	async fetchList(lang: string, _limit: number = 80) {
		try {
			const response = await this.props.db.get("proverbs", {
				params: { lang, _limit }
			});
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async update() {
		const lang = this.props.lang;
		const list = this.format(await this.fetchList(lang));
		this.setState({ list });
	}

	async componentDidMount() {
		this.update();
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
