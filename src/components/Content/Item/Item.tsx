import * as React from "react";
import { css } from "emotion";
import axios from "axios";

export interface ItemProps {}

const item = css`
  p {
    cursor: pointer;
  }
`;

const fetchItem = async (id: number) => {
  try {
    const response = await axios.get("http://localhost:4000/proverbs?id=" + id);
    return response.data[0].text;
  } catch (error) {
    console.log(error);
  }
};

export class Item extends React.Component<ItemProps> {
  state = {
    text: "Loading..."
  };
  fetchItem = async (id: number) => {
    const text = await fetchItem(id);
    console.log(id);
    this.setState({ text });
  };
  handleClick = () => {
    this.fetchItem(11);
  };
  async componentDidMount() {
    this.fetchItem(22);
  }
  render() {
    return (
      <div className={item} onClick={this.handleClick}>
        <p>{this.state.text}</p>
      </div>
    );
  }
}
