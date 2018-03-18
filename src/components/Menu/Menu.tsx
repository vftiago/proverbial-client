import * as React from "react";
import { css } from "emotion";

const mainMenu = css`
  height: 100%;
  background-color: #232323
  width: 400px;
`;

const menuItems = ["Empire", "Fleets", "Politics"];

export interface MainMenu {}

export class MainMenu extends React.Component<MainMenu, {}> {
	render() {
		return <div className={mainMenu} />;
	}
}
