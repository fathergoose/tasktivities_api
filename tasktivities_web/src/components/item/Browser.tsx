import React from 'react';
import styled from 'styled-components';

const ColumnWrapper = styled.div`
  height: 100%;
  width: 25%;
  background-color: #888;
`;

export default function Browser() {
  return (
    <ColumnWrapper>
      <span>Hi al</span>
    </ColumnWrapper>
  );
}
