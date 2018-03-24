// vendor imports
import * as React from "react";
import { css } from "emotion";
import axios from "axios";
// local imports
import randInt from "../../../utils/randInt";

export interface ItemProps {
	lang: string;
	count: number;
}

const item = css`
	p {
		cursor: pointer;
		user-select: none;
	}
`;

const fetchItem = async (id: number, lang: string) => {
	try {
		const response = await axios.get(
			"http://localhost:4000/proverbs?lang=" + lang + "&id=" + id
		);
		console.log(response.data[0].text);
		return response.data[0].text;
	} catch (error) {
		console.error(error);
	}
};

export class Item extends React.Component<ItemProps> {
	state = {
		text: "",
	};

	update = async () => {
		const id = randInt(1, this.props.count);
		const lang = this.props.lang;
		const text = await fetchItem(id, lang);
		this.setState({ text });
	};

	handleClick = async () => {
		this.update();
	};

	async componentDidMount() {
		this.update();
	}

	render() {
		return (
			<div className={item} onClick={this.handleClick}>
				<p>{this.state.text}</p>
			</div>
		);
	}
}
