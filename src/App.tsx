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
import { Proverb } from "./types";

interface State {
	count: number;
	id: number;
	list: Proverb[];
	lang: string;
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
		list: [],
		lang: DEFAULTS.lang,
		text: DEFAULTS.text,
		ready: false
	};

	api = api;

	async update(id?: number) {
		const count =
			this.state.count || (await this.api.fetchCount(this.state.lang));

		if (id) {
			const item = await this.api.fetchItem(this.state.lang, id);
			this.setState({
				id,
				count,
				list: item
			});
		} else {
			const list = await this.api.fetchList(this.state.lang);
			this.setState({
				list,
				count
			});
		}
		console.log(this.state);
	}

	onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.toLowerCase();
		if (this.state.list.length < this.state.count) {
			this.fetchAll(term);
		} else {
			this.filterList(term);
		}
	};

	filterList = (term: string) => {
		const list = this.state.list.filter(
			item => item.text.toLowerCase().search(term) !== -1
		);
		this.setState({ list });
	};

	fetchAll = async (term: string) => {
		const list = await this.api.fetchList(
			this.state.lang,
			this.state.count
		);
		this.setState({ list });
		this.filterList(term);
	};

	onNavigation = (id?: number) => {
		// if (this.state.list.length === 1) id = randInt(0, this.state.count);
		this.update(id);
	};

	async componentDidMount() {
		await this.update();
		this.setState({ ready: true });
	}

	render() {
		return (
			this.state.ready && (
				<div className={root}>
					<Menu id={this.state.id} onNavigation={this.onNavigation} />
					<Content
						list={this.state.list}
						onNavigation={this.onNavigation}
						onSearch={this.onSearch}
					/>
				</div>
			)
		);
	}
}
