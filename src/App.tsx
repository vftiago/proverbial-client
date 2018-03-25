// vendor imports
import * as React from "react";
import { css } from "emotion";
import axios from "axios";
// local imports
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";

const DEFAULTS = {
	lang: "en",
};

const db = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 1000,
});

enum Page {
	LandingPage = "LandingPage",
	ConfigurationPage = "ConfigurationPage",
}

interface State {
	view: string;
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
		view: "item",
	};

	onViewChange = (view: string): void => {
		this.setState({
			view,
		});
	};

	render() {
		return (
			<div className={root}>
				<Content view={this.state.view} lang={DEFAULTS.lang} db={db} />
				<Footer compiler="TypeScript" framework="React" />
			</div>
		);
	}
}
