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

export default function NavDrawer({ root }: { root?: RootUserCollection }) {
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
            {root.childItemLists.map(child => {
              return (
                <ListItem button key={child.id}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={child.name} />
                </ListItem>
              );
            })}
            {root.childCollections.map(child => {
              return (
                <>
                  <ListItem button key={child.id}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={child.name} />
                  </ListItem>
                  <>
                    {child.childItemLists.map(list => {
                      return (
                        <>
                          <ListItem button key={list.id}>
                            <ListItemIcon>
                              <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary={list.name} />
                          </ListItem>
                        </>
                      );
                    })}
                  </>
                </>
              );
            })}
          </>
        )}
      </List>
    </div>
  );
}
