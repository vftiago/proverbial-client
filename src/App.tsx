// vendor imports
import * as React from "react";
import { css } from "emotion";
import axios from "axios";
// local imports
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { Menu } from "./components/Menu/Menu";
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
	view: View;
}

const root = css`
	background-color: #222;
	color: wheat;
	font-family: Quando;
	min-height: 100%;
	display: flex;
	flex-direction: column;
`;

export class App extends React.Component<{}, State> {
	state = {
		view: View.Item
	};

	onViewSwitch = (view: View): void => {
		this.setState({
			view
		});
	};

	render() {
		return (
			<div className={root}>
				<Menu onViewSwitch={this.onViewSwitch} />
				<Content view={this.state.view} lang={DEFAULTS.lang} db={db} />
				<Footer compiler="TypeScript" framework="React" />
			</div>
		);
	}
}
