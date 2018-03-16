import * as React from "react";
import { css } from "emotion";

const hello = css`
  h1 {
    color: hotpink;
  }
`;

export class Hello extends React.Component {
  render() {
    return (
      <div className={hello}>
        <h1 className="f1">Hello!</h1>
      </div>
    );
  }
}
