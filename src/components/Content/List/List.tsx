import * as React from "react";
import { css } from "emotion";
import axios from "axios";

export interface ListProps {}

const list = css`
	p {
		cursor: pointer;
	}
`;

const fetchItem = async (id: number) => {
	try {
		const response = await axios.get(
			"http://localhost:4000/proverbs?id=" + id
		);
		return response.data[0].text;
	} catch (error) {
		console.log(error);
	}
};

export class List extends React.Component<ListProps> {
	state = {
		text: "Loading..."
	};
	fetchItem = async (id: number) => {
		const text = await fetchItem(id);
		this.setState({ text });
	};
	handleClick = () => {
		this.fetchItem(11);
	};
	async componentDidMount() {
		this.fetchItem(22);
	}
	render() {
		return (
			<div className={list}>
				<p>{this.state.text}</p>
			</div>
		);
	}
}
