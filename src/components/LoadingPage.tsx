import React from 'react';
import { css } from 'emotion';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingPage = () => {
  return (
    <div className={rootStyle}>
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;

// #region styles
const rootStyle = css`
  height: 100%;
  display: flex;
  background-color: #333;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// #endregion styles
