// vendor imports
import * as React from 'react';
import { css } from 'emotion';

// types
import { Proverb } from '../../../types/types';
import Item from './Item/Item';

interface ListProps {
  list: Proverb[];
  onClickProverb: (id: string) => void;
}

const list = css`
  width: 100%;
  flex-direction: column;
  flex: 1 0 auto;
  display: flex;
  ul {
    list-style: none;
    display: flex;
    flex: 1 0 auto;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 0;
  }
`;

export class List extends React.Component<ListProps> {
  componentDidMount() {
    console.log('List Mounted');
  }

  format(arr: Proverb[]): JSX.Element[] {
    const { onClickProverb, list } = this.props;
    return arr.map((el, index) => (
      <Item
        key={index}
        el={el}
        onClickProverb={onClickProverb}
        proverbCount={list.length}
      />
    ));
  }

  render() {
    return (
      <div className={list}>
        <ul>{this.format(this.props.list)}</ul>
      </div>
    );
  }
}
