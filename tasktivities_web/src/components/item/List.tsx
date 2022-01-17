import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Item } from '../../pages/Workspace';

const ColumnWrapper = styled.div`
  height: 100%;
  width: 50%;
  background-color: #eee;
`;

const ItemWrapper = styled.button<{ focusedIndex: number; customKey: number }>`
width: 100%;
  padding .5em;
  border: none;
  background-color: ${({ focusedIndex, customKey }) =>
    focusedIndex === customKey ? '#ddd' : '#eee'};
  &:hover {
    color: #0645AD
  }
`;

type ItemListProps = {
  items: Item[];
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
};
export default function List({
  items,
  focusedIndex,
  setFocusedIndex,
}: ItemListProps) {
  return (
    <ColumnWrapper>
      <div>List of items:</div>
      {items.map((item: Item, index: number) => (
        <ItemWrapper
          focusedIndex={focusedIndex}
          onClick={() => setFocusedIndex(index)}
          key={index}
          customKey={index}
        >
          Item: {item.name}
          Key: {index}
          FocusedIndex: {focusedIndex}
        </ItemWrapper>
      ))}
    </ColumnWrapper>
  );
}
