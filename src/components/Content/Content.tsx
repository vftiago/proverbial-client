// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import { List } from "./List/List";
// types
import { Proverb } from "../../types";
import { SearchBar } from "./SearchBar/SearchBar";

interface ContentProps {
	id: number;
	count: number;
	lang: string;
	list: Proverb[];
	onNavigation: (id?: number) => void;
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const content = css`
	background-color: #222;
	color: #ffd;
	text-shadow: 0 1px 1px black;
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export class Content extends React.Component<ContentProps> {
	state: State = {
		list: [],
		ready: false
	};

	async componentDidMount() {
		this.setState({ list: this.props.list, ready: true });
	}

	render() {
		return (
			<div className={content}>
				<SearchBar onSearch={this.props.onSearch} />
				<List
					lang={this.props.lang}
					list={this.props.list}
					count={this.props.count}
					onNavigation={this.props.onNavigation}
				/>
			</div>
		);
	}
}

interface State {
	list: Proverb[];
	ready: boolean;
}
