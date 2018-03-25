// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import randInt from "../../../utils/randInt";

export interface ItemProps {
	lang: string;
	count: number;
	db: AxiosInstance;
}

const item = css`
	padding: 30px;
	p {
		cursor: pointer;
		user-select: none;
	}
`;

export class Item extends React.Component<ItemProps> {
	state = {
		text: "",
	};

	async fetchItem(id: number, lang: string) {
		try {
			const response = await this.props.db.get("proverbs", {
				params: { lang, id },
			});
			console.log(response.data[0].text);
			return response.data[0].text;
		} catch (error) {
			console.error(error);
		}
	}

	async update() {
		const id = randInt(1, this.props.count);
		const lang = this.props.lang;
		const text = await this.fetchItem(id, lang);
		this.setState({ text });
	}

	async handleClick() {
		this.update();
	}

	async componentDidMount() {
		this.update();
	}

	render() {
		return (
			<div className={item} onClick={this.handleClick.bind(this)}>
				<p>{this.state.text}</p>
			</div>
		);
	}
}
