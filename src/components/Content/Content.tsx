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
	id: number;
	count: number;
	view: View;
	lang: string;
	db: AxiosInstance;
	text: string;
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
	async componentDidMount() {}

	render() {
		return (
			<div className={content}>
				{this.props.view === View.Item ? (
					<Item
						text={this.props.text}
						onViewSwitch={this.props.onViewSwitch}
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
