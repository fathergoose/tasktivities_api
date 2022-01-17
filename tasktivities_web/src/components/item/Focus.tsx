import React from 'react';
import styled from 'styled-components';

const ColumnWrapper = styled.div`
  height: 100%;
  width: 25%;
  background-color: #888;
`;

type Tag = {
  id: string;
  name: string;
};
export type Item = {
  id: string;
  name: string;
  description?: string;
  tags: Tag[];
};
type ItemFocusProps = {
  item: Item;
};
export default function Focus({ item }: ItemFocusProps) {
  return (
    <ColumnWrapper>
      <span>Hi al</span>
    </ColumnWrapper>
  );
}
