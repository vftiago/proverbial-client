// vendor imports
import * as React from "react";
import { css } from "emotion";
// local imports
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";

const DEFAULTS = {
	lang: "en",
};

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
	height: 100%;
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
				<Content view="item" lang={DEFAULTS.lang} />
				<Footer compiler="TypeScript" framework="React" />
			</div>
		);
	}
}
