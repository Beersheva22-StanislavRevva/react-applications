import { Tab, Typography } from "@mui/material";
import { RouteType } from "./Navigator";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const NavigatorPortrait: React.FC<{routes:RouteType[]}> = ({routes}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuName, setMenuName] = useState(routes[0].label);
    const handlerDrawerClose = () => {
        setOpen(false);
    }

    function updateMenuName(menuName:string) {
        handlerDrawerClose();
        setMenuName(menuName);
    }

    useEffect(() => {
        let index = routes.findIndex(r=>r.to === location.pathname)
        if (index < 0 ) {
            index = 0;
        }
        navigate(routes[index].to);
        setMenuName(routes[index].label);
    }, [routes])
    
   
    function getListItems(): ReactNode {
        return routes.map(r=> (
        <ListItem key={r.label}>
            <ListItemButton>
                 <Tab component={NavLink} to={r.to} label={r.label} key={r.label} value={r.label} onClick={updateMenuName.bind(undefined, r.label)}/>
            </ListItemButton>
        </ListItem>
        ))
    }


    const drawerWidth = 240;
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
      open?: boolean;
    }>(({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }));
    
    interface AppBarProps extends MuiAppBarProps {
      open?: boolean;
    }
    
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
    
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));
    
     function PersistentDrawerLeft() {
      const theme = useTheme();
      const [open, setOpen] = React.useState(false);
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {menuName}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {getListItems()}
            </List>
            </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <Typography paragraph>
            </Typography>
          </Main>
          <Outlet></Outlet>
        </Box>
      );
    }
    
    return PersistentDrawerLeft();

}
export default NavigatorPortrait;





function setOpen(arg0: boolean) {
    throw new Error("Function not implemented.");
}

