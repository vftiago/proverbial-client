// vendor imports
import * as React from 'react';
import { css } from 'emotion';
// local imports
import { List } from './List/List';
// types
import { Page, Proverb, User } from '../../types/types';
import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import SettingsPage from '../SettingsPage';

interface ContentProps {
  proverbialUser?: User;
  list: Proverb[];
  currentPage: Page;
  errorMessage: string | undefined;
  onClickProverb: (id: string) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const contentStyle = css`
  background-color: #222;
  color: #ffd;
  font-family: 'Quando';
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export class Content extends React.Component<ContentProps> {
  componentDidMount() {
    console.log('Content Mounted');
  }

  render() {
    const { currentPage, onClickProverb, proverbialUser } = this.props;

    let content;

    switch (currentPage) {
      case Page.LoadingPage:
        content = <LoadingPage />;
        break;
      case Page.ErrorPage:
        content = <ErrorPage />;
        break;
      case Page.SettingsPage:
        if (!proverbialUser) return; // we should always have a user on the settings page
        content = <SettingsPage proverbialUser={proverbialUser} />;
        break;
      default:
        content = (
          <List list={this.props.list} onClickProverb={onClickProverb} />
        );
        break;
    }

    return <div className={contentStyle}>{content}</div>;
  }
}
