// vendor imports
import * as React from "react";
import { css } from "emotion";
import axios from "axios";
// local imports
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { Menu } from "./components/Menu/Menu";
import randInt from "./utils/randInt";
import api from "./api/api";
import DEFAULTS from "./defaults";

// types
import { Proverb, View } from "./types";

interface State {
	count: number;
	id: number;
	history: string[];
	list: Proverb[];
	lang: string;
	view: View;
	text: string;
	ready: boolean;
}

const root = css`
	font-family: Quando;
	min-height: 100%;
	min-width: 500px;
	display: flex;
	flex-direction: column;
`;

export class App extends React.Component<{}, State> {
	state: State = {
		count: 0,
		id: 0,
		history: [],
		list: [],
		lang: DEFAULTS.lang,
		view: DEFAULTS.view,
		text: DEFAULTS.text,
		ready: false
	};

	api = api;

	async update(view: View = DEFAULTS.view, id?: number) {
		const count =
			this.state.count || (await this.api.fetchCount(this.state.lang));
		id = id || randInt(1, count);
		switch (view) {
			case View.Item:
				const text = await this.api.fetchItem(this.state.lang, id);
				this.state.history.push(text);
				this.setState({
					id,
					count,
					text,
					view
				});
				break;
			case View.List:
				const list = this.state.list.length
					? this.state.list
					: await this.api.fetchList(this.state.lang);
				this.setState({
					list,
					count,
					view
				});
		}
		console.log(this.state);
	}

	onSearch = () => {
		this.fetchAll();
	};

	fetchAll = async () => {
		console.log(1);
		const list = await this.api.fetchList(
			this.state.lang,
			this.state.count
		);
		this.setState({
			list
		});
	};

	onViewSwitch = (view: View, id?: number) => {
		this.update(view, id);
	};

	async componentDidMount() {
		await this.update();
		this.setState({ ready: true });
	}

	render() {
		return (
			this.state.ready && (
				<div className={root}>
					<Menu
						id={this.state.id}
						view={this.state.view}
						onViewSwitch={this.onViewSwitch}
					/>
					<Content
						onSearch={this.onSearch}
						id={this.state.id}
						count={this.state.count}
						view={this.state.view}
						lang={DEFAULTS.lang}
						text={this.state.text}
						list={this.state.list}
						onViewSwitch={this.onViewSwitch}
					/>
				</div>
			)
		);
	}
}
