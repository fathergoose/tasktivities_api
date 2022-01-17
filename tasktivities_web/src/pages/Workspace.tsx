import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Browser from '../components/item/Browser';
import Focus from '../components/item/Focus';
import List from '../components/item/List';

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
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

type GetItemsResponse = {
  getAllItems: Item[];
};
const GET_ITEMS = gql`
  query GetAllItems {
    getAllItems {
      id
      createdAt
      name
    }
  }
`;
export default function Workspace() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { loading, error, data } = useQuery<GetItemsResponse>(GET_ITEMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Wrapper>
      <Container>
        <Browser />
        {data && (
          <>
            <List
              items={data.getAllItems}
              focusedIndex={focusedIndex}
              setFocusedIndex={setFocusedIndex}
            />
            <Focus item={data?.getAllItems[focusedIndex]} />
          </>
        )}
      </Container>
    </Wrapper>
  );
}
