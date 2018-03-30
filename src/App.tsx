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
	id?: number;
	count: number;
	view: View;
}

const root = css`
	font-family: Quando;
	min-height: 100%;
	display: flex;
	flex-direction: column;
`;

export class App extends React.Component<{}, State> {
	state: State = {
		view: View.Item,
		count: 0,
		id: 0
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

	onViewSwitch = (view: View, id?: number): void => {
		id = id || randInt(1, this.state.count);
		this.setState({
			id,
			view
		});
	};

	onViewSingle = (id: number): void => {
		this.setState({
			view: View.Item
		});
	};

	async componentDidMount() {
		const count = await this.fetchCount(DEFAULTS.lang);
		const id = randInt(1, count);
		this.setState({ id, count });
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
							db={db}
							onViewSwitch={this.onViewSwitch}
						/>
					)}
			</div>
		);
	}
}
