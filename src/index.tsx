import * as React from "react";
import * as ReactDOM from "react-dom";
import { css } from "emotion";

import { Footer } from "./components/Footer/Footer";
import { Hello } from "./components/Hello/Hello";
import { Content } from "./components/Content/Content";

const root = css`
  font-family: Quando;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

ReactDOM.render(
  <div className={root}>
    <Content />
    <Footer compiler="TypeScript" framework="React" />
  </div>,
  document.getElementById("root")
);
