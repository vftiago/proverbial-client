// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import { Item } from "./Item/Item";
import { List } from "./List/List";
// types
import { View } from "../../../types";

interface ContentProps {
	id?: number;
	count: number;
	view: View;
	lang: string;
	db: AxiosInstance;
	onViewSwitch: (view: View, id?: number) => void;
}

interface State {
	count: number;
}

const content = css`
	background-color: #222;
	color: wheat;
	text-shadow: 1px 1px 1px black;
	display: flex;
	flex: 1 0 auto;
`;

export class Content extends React.Component<ContentProps> {
	// state = {
	// 	count: 0
	// };

	// async fetchCount(lang: string) {
	// 	try {
	// 		const response = await this.props.db.get("counts", {
	// 			params: { lang }
	// 		});
	// 		return response.data[0].count;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	async componentDidMount() {
		// const count = await this.fetchCount(this.props.lang);
		// this.setState({ count });
		debugger;
	}

	render() {
		return (
			<div className={content}>
				{this.props.view === View.Item ? (
					<Item
						id={this.props.id}
						db={this.props.db}
						lang={this.props.lang}
						count={this.props.count}
					/>
				) : (
					<List
						db={this.props.db}
						lang={this.props.lang}
						count={this.props.count}
						onViewSwitch={this.props.onViewSwitch}
					/>
				)}
			</div>
		);
	}
}
