import React, { Dispatch, SetStateAction } from 'react';
import { Item } from '../../pages/Workspace';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import Checkbox from '@mui/material/Checkbox';

type ItemList = {
  id: string;
  name: string;
  items: Item[];
};

export type ItemListProps = {
  itemList: ItemList;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
};

function truncateAtWordSeparator(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, text.slice(0, maxLength).lastIndexOf(' ')) + '...';
}

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
        {itemList.items.map((item: Item, index: number, items: Item[]) => (
          <div key={index}>
            <ListItemButton
              selected={focusedIndex === index}
              onClick={event => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <Checkbox checked={item.state === 'COMPLETED'} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                secondary={truncateAtWordSeparator(item.description || '', 45)}
                primaryTypographyProps={{
                  color:
                    item.state === 'PENDING' ? 'text.primary' : 'text.disabled',
                }}
                secondaryTypographyProps={{
                  color:
                    item.state === 'PENDING' ? 'text.primary' : 'text.disabled',
                }}
              />
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
}
