// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";
import stringToRgb from "../../../utils/stringToRgb";

export interface ItemProps {
	id: number;
	lang: string;
	count: number;
	db: AxiosInstance;
}

interface State {
	text: string;
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
		text: "",
		history: [""]
	};

	async fetchItem(
		id: number = this.props.id,
		lang: string = this.props.lang
	) {
		try {
			const response = await this.props.db.get("proverbs", {
				params: { lang, id }
			});
			this.state.history.push(response.data[0].text);
			return response.data[0].text;
		} catch (error) {
			console.error(error);
		}
	}

	async update() {
		const text = await this.fetchItem();
		this.setState({ text });
	}

	async handleClick() {
		this.update();
	}

	async componentDidMount() {
		console.log(this.props);
		this.update();
	}

	render() {
		return (
			<div
				className={item}
				onClick={this.handleClick.bind(this)}
				style={{ "background-color": stringToRgb(this.state.text) }}
			>
				<p>{this.state.text}</p>
			</div>
		);
	}
}
