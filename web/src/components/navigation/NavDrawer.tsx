import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import FolderIcon from '@mui/icons-material/Folder';
import ListIcon from '@mui/icons-material/ListAlt';
import { RootUserCollection } from '../../pages/Workspace';
import React, { Dispatch, SetStateAction } from 'react';
import { isConstructorDeclaration } from 'typescript';

type NavDrawerProps = {
  root?: RootUserCollection;
  activeList: string;
  setActiveList: Dispatch<SetStateAction<string>>;
};
export default function NavDrawer({
  root,
  activeList,
  setActiveList,
}: NavDrawerProps) {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key={'Inbox'}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={'Inbox'} />
        </ListItem>
        <ListItem button key={'Starred'}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={'Starred'} />
        </ListItem>
        <ListItem button key={'Drafts'}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={'Drafts'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'/'}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={'/'} />
        </ListItem>
        {root && (
          <>
            {root.childItemLists.map(childItemList => {
              return (
                <ListItem
                  button
                  key={childItemList.id}
                  onClick={() => setActiveList(childItemList.id)}
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={childItemList.name} />
                </ListItem>
              );
            })}
            {root.childCollections.map(childCollection => {
              return (
                <React.Fragment key={childCollection.id}>
                  <ListItem button>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={childCollection.name} />
                  </ListItem>
                  <>
                    {childCollection.childItemLists.map(list => {
                      return (
                        <React.Fragment key={list.id}>
                          <ListItem
                            button
                            onClick={() => setActiveList(list.id)}
                          >
                            <ListItemIcon>
                              <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary={list.name} />
                          </ListItem>
                        </React.Fragment>
                      );
                    })}
                  </>
                </React.Fragment>
              );
            })}
          </>
        )}
      </List>
    </div>
  );
}
