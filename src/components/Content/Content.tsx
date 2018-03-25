// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import { Item } from "./Item/Item";
import { List } from "./List/List";

interface ContentProps {
	view: string;
	lang: string;
	db: AxiosInstance;
}

interface ContentProps {
	view: string;
	lang: string;
	db: AxiosInstance;
}

interface State {
	count: number;
}

const content = css`
	background-color: #222;
	color: wheat;
	text-shadow: 1px 1px 1px black;
	font-size: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 auto;
`;

export class Content extends React.Component<ContentProps> {
	state = {
		count: 0,
	};

	async fetchCount(lang: string) {
		try {
			const response = await this.props.db.get("counts", {
				params: { lang },
			});
			return response.data[0].count;
		} catch (error) {
			console.error(error);
		}
	}

	async componentDidMount() {
		const count = await this.fetchCount(this.props.lang);
		this.setState({ count });
	}

	render() {
		if (this.state.count) {
			return (
				<div className={content}>
					{this.props.view === "item" ? (
						<Item
							db={this.props.db}
							lang={this.props.lang}
							count={this.state.count}
						/>
					) : (
						<List
							db={this.props.db}
							lang={this.props.lang}
							count={this.state.count}
						/>
					)}
				</div>
			);
		} else {
			return false;
		}
	}
}
