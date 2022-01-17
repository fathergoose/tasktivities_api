import React from 'react';
import styled from 'styled-components';
import Browser from '../components/item/Browser';
import Focus from '../components/item/Focus';
import List from '../components/item/List';

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
`;

export default function Workspace() {
  const item = {
    id: '1000',
    name: 'Fake Item',
    description: 'A HC test item',
    tags: [{ id: '1', name: 'fun' }],
  };
  return (
    <Wrapper>
      <Container>
        <Browser />
        <List />
        <Focus item={item} />
      </Container>
    </Wrapper>
  );
}
