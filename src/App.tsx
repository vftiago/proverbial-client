// vendor imports
import * as React from "react";
import { css } from "emotion";
import axios from "axios";
// local imports
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { Menu } from "./components/Menu/Menu";
import randInt from "./utils/randInt";
// types
import { View } from "../types";

const DEFAULTS = {
	lang: "en"
};

const db = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 5000
});

interface State {
	count: number;
	id: number;
	history: string[];
	lang: string;
	view: View;
	text: string;
}

const root = css`
	font-family: Quando;
	min-height: 100%;
	display: flex;
	flex-direction: column;
`;

export class App extends React.Component<{}, State> {
	state: State = {
		count: 0,
		id: 0,
		history: [],
		lang: DEFAULTS.lang,
		view: View.Item,
		text: "Loading..."
	};

	async fetchCount(lang: string) {
		try {
			const response = await db.get("counts", {
				params: { lang }
			});
			return response.data[0].count;
		} catch (error) {
			console.error(error);
		}
	}

	async fetchItem(
		id: number = this.state.id,
		lang: string = this.state.lang
	) {
		try {
			const response = await db.get("proverbs", {
				params: { lang, id }
			});
			this.state.history.push(response.data[0].text);
			return response.data[0].text;
		} catch (error) {
			console.error(error);
		}
	}

	async update(id: number = randInt(1, this.state.count), view: View) {
		const text = await this.fetchItem(id);
		this.setState({
			id,
			text,
			view
		});
	}

	onViewSwitch = (view: View, id?: number) => {
		this.update(id, view);
		console.log(this.state);
	};

	async componentDidMount() {
		const count = await this.fetchCount(DEFAULTS.lang);
		const id = randInt(1, count);
		const text = await this.fetchItem(id);
		this.setState({ id, count, text });
	}

	render() {
		return (
			<div className={root}>
				<Menu view={this.state.view} onViewSwitch={this.onViewSwitch} />
				{this.state.count &&
					this.state.id && (
						<Content
							id={this.state.id}
							count={this.state.count}
							view={this.state.view}
							lang={DEFAULTS.lang}
							text={this.state.text}
							db={db}
							onViewSwitch={this.onViewSwitch}
						/>
					)}
			</div>
		);
	}
}
