import * as React from "react";
import { css } from "emotion";

const pink = css`
  color: hotpink;
`;

export interface HelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <h1 className={pink}>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
