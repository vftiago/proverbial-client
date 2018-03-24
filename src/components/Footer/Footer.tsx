import * as React from "react";
import { css } from "emotion";

export interface FooterProps {
	compiler: string;
	framework: string;
}

const footer = css`
	font-size: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
`;

export class Footer extends React.Component<FooterProps> {
	render() {
		return (
			<div className={footer}>
				<p>
					Hello from {this.props.compiler} and {this.props.framework}!
				</p>
			</div>
		);
	}
}
