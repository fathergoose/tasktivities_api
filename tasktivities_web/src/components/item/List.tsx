import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { isTemplateTail } from 'typescript';
import { Item } from './Focus';

const EXCHANGE_RATES = gql`
  query GetAllItems {
    getAllItems {
      id
      createdAt
      name
    }
  }
`;
const ColumnWrapper = styled.div`
  height: 100%;
  width: 50%;
  background-color: #eee;
`;

/**
 * Eventually, this will take the list it's going to
 * display as a prop
 */
export default function List() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(JSON.stringify(data));
  return (
    <ColumnWrapper>
      <span>List of items:</span>
      {data.getAllItems.map((item: Item) => (
        <div>Item: {item.name}</div>
      ))}
    </ColumnWrapper>
  );
}
