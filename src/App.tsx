import * as React from "react";
import { css } from "emotion";

import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";

enum Page {
  LandingPage = "LandingPage",
  ConfigurationPage = "ConfigurationPage"
}

interface State {
  view: string;
}

const root = css`
  font-family: Quando;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export class App extends React.Component<{}, State> {
  state = {
    view: "item"
  };

  onViewChange = (view: string): void => {
    this.setState({
      view
    });
  };

  render() {
    return (
      <div className={root}>
        <Content view="item" />
        <Footer compiler="TypeScript" framework="React" />
      </div>
    );
  }
}
