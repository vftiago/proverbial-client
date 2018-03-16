import * as React from "react";
import { css } from "emotion";

export interface ContentProps {
  view: string;
}

const content = css`
  background-color: #222;
  color: wheat;
  text-shadow: 1px 1px 1px black;
  padding: 30px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  p {
    cursor: pointer;
  }
`;

function List() {
  return (
    <div className={content}>
      <p>This should be a list.</p>
    </div>
  );
}

function Item() {
  return (
    <div className={content}>
      <p>A bird in the hand is worth two in the bush.</p>
    </div>
  );
}

export class Content extends React.Component<ContentProps> {
  render() {
    return this.props.view === "single" ? <Item /> : <List />;
  }
}
