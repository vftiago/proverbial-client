// vendor
import * as React from 'react';
import { css } from 'emotion';
import SettingsIcon from '@material-ui/icons/Settings';

// project
import MenuButton from './MenuButton';
import { User } from '../../types/types';

interface MenuButtonProps {
  user: User;
  onGoogleSignOut: () => void;
  onClickSettingsPage: () => void;
}

export default class extends React.Component<MenuButtonProps> {
  render() {
    const { user, onClickSettingsPage, onGoogleSignOut } = this.props;

    const { imageURL, firstName } = user;

    return (
      <div className={userInfoStyle}>
        <div className={userAvatarStyle}>
          <img src={imageURL} alt="user profile picture" />
        </div>
        <div className={userGreetingStyle}>Hello, {firstName}!</div>
        <div className={settingsButtonStyle} onClick={onClickSettingsPage}>
          <SettingsIcon />
        </div>
        <MenuButton onClick={onGoogleSignOut}>
          <p>Sign Out</p>
        </MenuButton>
      </div>
    );
  }
}

const settingsButtonStyle = css`
  display: flex;
  color: white;
  padding: 0 12px;
  cursor: pointer;
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
`;

const userAvatarStyle = css`
  margin-right: 12px;
  height: 32px;
  img {
    border-radius: 50%;
    height: 32px;
    width: 32px;
  }
`;

const userGreetingStyle = css`
  color: white;
`;
