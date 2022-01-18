import React from 'react';
import styled from 'styled-components';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

const ColumnWrapper = styled.div`
  height: 100%;
  background-color: #888;
`;

export default function Browser() {
  return (
    <ColumnWrapper>
      <AccessAlarmIcon />
      <ThreeDRotation />
    </ColumnWrapper>
  );
}
