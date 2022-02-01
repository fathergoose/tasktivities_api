import React, { Dispatch, SetStateAction } from 'react';
import { Item } from '../../pages/Workspace';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { ITEM_LIST_QUERY } from '../../gql/queries';
import { useQuery } from '@apollo/client';

type ItemList = {
  id: string;
  name: string;
  items: Item[];
};

type ItemListProps = {
  itemList: ItemList;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
};

export default function ItemListView({
  itemList,
  focusedIndex,
  setFocusedIndex,
}: ItemListProps) {
  const handleListItemClick = (_: unknown, idx: number): void => {
    setFocusedIndex(idx);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='main mailbox folders'>
        {itemList.items.map(
          (item: Item, index: number, items: Item[]) => (
            <>
              <ListItemButton
              // TODO: Make this more efficient
                selected={focusedIndex === items.indexOf(item)}
                onClick={event => handleListItemClick(event, items.indexOf(item))}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
              <Divider />
            </>
          ),
        )}
      </List>
    </Box>
  );
}
