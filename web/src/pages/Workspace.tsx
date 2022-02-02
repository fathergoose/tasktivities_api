import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Focus from '../components/item/FocusedItem';
import ItemList, { ItemListProps } from '../components/item/ItemList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavDrawer from '../components/navigation/NavDrawer';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ROOT_USER_COLLECTION_QUERY } from '../gql/queries';
import { TimeLike } from 'fs';

type Tag = string;
type Seconds = number;

export type Item = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  itemDate: Date;
  duration: Seconds;
  tags: Tag[];
  state: 'PENDING' | 'CANCELED' | 'COMPLETED';
  type: 'TASK' | 'ACTIVITY';
};

export type RootUserCollection = {
  childItemLists: {
    name: string;
    id: string;
    items: Item[];
  }[];
  childCollections: {
    name: string;
    id: string;
    childItemLists: {
      name: string;
      id: string;
      items: Item[];
    }[];
    childCollections: {
      name: string;
      id: string;
    }[];
  }[];
};
export type RootUserCollectionResponse = {
  rootUserCollection: RootUserCollection;
};

const drawerWidth = 240;

interface WorkspaceProps {
  window?: () => Window;
  userId: string;
}

export default function Workspace({ window, userId }: WorkspaceProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [activeList, setActiveList] = useState<string>('_inbox');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { loading, error, data } = useQuery<RootUserCollectionResponse>(
    ROOT_USER_COLLECTION_QUERY,
    { variables: { userId } },
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <NavDrawer
      activeList={activeList}
      setActiveList={setActiveList}
      root={data?.rootUserCollection}
    />
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  
    // FIXME: This should be a recursive function no progressively deeper search
    // LOL: I can't believe it works
  const activeListObject =
    data?.rootUserCollection.childItemLists.find(
      list => list.id === activeList,
    ) ||
    data?.rootUserCollection.childCollections
      .find(collection =>
        collection.childItemLists.find(list => list.id === activeList),
      )
      ?.childItemLists.find(list => list.id === activeList);
      
  const activeItemObject = activeListObject?.items[focusedIndex];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='item collection folders and item lists'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Grid
          container
          spacing={{ xs: 2, md: 4, lg: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={6}>
            {data && activeListObject && (
              <ItemList
                itemList={activeListObject}
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
              />
            )}
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            {activeItemObject && (
              <Focus
                item={activeItemObject}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
