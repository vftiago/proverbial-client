import React from 'react';
import { css } from 'emotion';

import { User } from '../types/types';

interface SettingsPageProps {
  proverbialUser: User;
}

const SettingsPage: React.SFC<SettingsPageProps> = props => {
  const { proverbialUser } = props;

  console.log(proverbialUser);

  return (
    <div className={settingsPageRootStyle}>
      <h1>Settings Page</h1>
      <p>{proverbialUser.settings.selectedLanguages[0].label}</p>
    </div>
  );
};

export default SettingsPage;

// #region styles
const settingsPageRootStyle = css`
  height: 100%;
  display: flex;
  background-color: #333;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// #endregion styles
