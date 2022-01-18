import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Item } from '../../pages/Workspace';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const ColumnWrapper = styled.div`
  height: 100%;
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
export function notItemList({
  items,
  focusedIndex,
  setFocusedIndex,
}: ItemListProps) {
  return (
    <ColumnWrapper>
      <div>List of items:</div>
    </ColumnWrapper>
  );
}

export default function ItemList({
  items,
  focusedIndex,
  setFocusedIndex,
}: ItemListProps) {
  const handleListItemClick = (_: unknown, index: number): void => {
    setFocusedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='main mailbox folders'>
        {items.map((item: Item, index: number) => (
          <>
            <ListItemButton
              selected={focusedIndex === index}
              onClick={event => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
}
