import * as React from "react";
import * as ReactDOM from "react-dom";
import { css } from "emotion";

import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";

const root = css`
  font-family: Quando;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

ReactDOM.render(
  <div className={root}>
    <Content view="single" />
    <Footer compiler="TypeScript" framework="React" />
  </div>,
  document.getElementById("root")
);
