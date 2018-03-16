import * as React from "react";
import { css } from "emotion";

const content = css`
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  p {
    cursor: pointer;
  }
`;

const fetch = async () => {
  const response = await JSON.parse("./en.json");
  console.log(response);
};

fetch();

export class Content extends React.Component {
  render() {
    return (
      <div className={content}>
        <p>A bird in the hand is worth two in the bush.</p>
      </div>
    );
  }
}
