// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
// types
import { View } from "../../../types";

const verticalCenter = css`
	display: flex;
	align-items: center;
`;

const menu = css`
	${verticalCenter};
	color: white;
	background-color: #222222;
	font-family: "Roboto Condensed";
	padding: 10px;
	h1 {
		font-size: 24px;
		margin-right: 24px;
	}
	ul {
		${verticalCenter};
		list-style: none;
		li {
			cursor: pointer;
			${verticalCenter};
			padding: 0 12px;
			span {
				padding: 0 12px;
				font-size: 18px;
			}
		}
	}
`;

export interface MenuProps {
	onViewSwitch: (view: View) => void;
	view: View;
}

export class Menu extends React.Component<MenuProps> {
	render() {
		return (
			<div className={menu}>
				<ul>
					{this.props.view === View.Item ? (
						<li onClick={() => this.props.onViewSwitch(View.List)}>
							<GridIcon size={32} fill={"white"} />
						</li>
					) : (
						<li onClick={() => this.props.onViewSwitch(View.Item)}>
							<ShuffleIcon size={32} fill={"white"} />
						</li>
					)}
				</ul>
			</div>
		);
	}
}
