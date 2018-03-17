import * as React from "react";
import { css } from "emotion";

export interface ItemProps {
  text: string;
}

const item = css`
  p {
    cursor: pointer;
  }
`;

export class Item extends React.Component<ItemProps> {
  render() {
    return (
      <div className={item}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
