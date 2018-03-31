// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";

// types
import { View } from "../../types";

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
		font-size: 18px;
		margin-right: 24px;
		user-select: none;
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
	id: number;
	view: View;
	onViewSwitch: (view: View, id?: number) => void;
}

export class Menu extends React.Component<MenuProps> {
	render() {
		return (
			<div className={menu}>
				<h1>Proverbial</h1>
				{this.props.view === View.Item ? (
					<ul>
						<li onClick={() => this.props.onViewSwitch(View.List)}>
							<GridIcon size={28} fill={"white"} />
						</li>
						<li
							onClick={() =>
								this.props.onViewSwitch(
									View.Item,
									this.props.id - 1
								)
							}
						>
							<LeftIcon size={18} fill={"white"} />
						</li>
						<li
							onClick={() =>
								this.props.onViewSwitch(
									View.Item,
									this.props.id + 1
								)
							}
						>
							<RightIcon size={18} fill={"white"} />
						</li>
					</ul>
				) : (
					<div>
						<ul>
							<li
								onClick={() =>
									this.props.onViewSwitch(View.Item)
								}
							>
								<ShuffleIcon size={28} fill={"white"} />
							</li>
						</ul>
					</div>
				)}
			</div>
		);
	}
}
