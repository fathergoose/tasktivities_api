import React from 'react';
import styled from 'styled-components';
import { Item } from '../../pages/Workspace';

const ColumnWrapper = styled.div`
  height: 100%;
  width: 45%;
  background-color: #888;
`;
const Label = styled.label``;
const Value = styled.span``;

type ItemFocusProps = {
  item: Item;
};
export default function Focus({ item }: ItemFocusProps) {
  return (
    <ColumnWrapper>
      <Label title='Item Name'>Name: </Label>
      <Value>{item.name}</Value>
    </ColumnWrapper>
  );
}
