import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Focus from '../components/item/FocusedItem';
import ItemList from '../components/item/ItemList';
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
}
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

  const drawer = <NavDrawer root={data?.rootUserCollection} />;

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        aria-label='mailbox folders'
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
            {data && (
              <ItemList
                itemList={data.rootUserCollection.childItemLists[0]}
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
              />
            )}
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            {data && (
              <Focus
                item={data?.rootUserCollection.childItemLists[0]?.items[0]}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
