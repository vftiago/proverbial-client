// vendor imports
import * as React from "react";
import { css } from "emotion";
import axios from "axios";
// local imports
import { Response } from "../../../src/types";
import { Item } from "./Item/Item";
import { List } from "./List/List";

interface ContentProps {
	view: string;
	lang: string;
}

interface State {
	count: number;
}

const content = css`
	background-color: #222;
	color: wheat;
	text-shadow: 1px 1px 1px black;
	padding: 30px;
	font-size: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 auto;
`;

const fetchCount = async (lang: string) => {
	try {
		const response = await axios.get(
			"http://localhost:4000/counts?lang=" + lang
		);
		return response.data[0].count;
	} catch (error) {
		console.error(error);
	}
};

export class Content extends React.Component<ContentProps> {
	state = {
		count: 0,
	};

	async componentDidMount() {
		const count = await fetchCount(this.props.lang);
		this.setState({ count });
	}

	render() {
		if (this.state.count) {
			return (
				<div className={content}>
					{this.props.view === "item" ? (
						<Item lang={this.props.lang} count={this.state.count} />
					) : (
						<List />
					)}
				</div>
			);
		} else {
			return false;
		}
	}
}
