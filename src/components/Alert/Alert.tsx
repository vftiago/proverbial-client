import React from 'react';
import { css } from 'emotion';

const rootStyle = css`
  box-sizing: border-box;
  background-color: pink;
  font-family: 'Roboto Condensed';
  padding: 12px;
  display: flex;
  width: 100%;
`;

interface Props {
  message: string;
}

const Alert = ({ message }: Props) => {
  return <div className={rootStyle}>{message}</div>;
};

export default Alert;
