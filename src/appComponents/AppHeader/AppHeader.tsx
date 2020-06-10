import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, Breadcrumbs, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import PersonIcon from '@material-ui/icons/Person';

import './AppHeader.scss';
import useAppState from '../../globalState/useAppState';

const useStyles = makeStyles((theme) => ({
  title: {flexGrow: 1}
}));

export interface IAppHeaderProps {
  children?: React.ReactNode;
}

const AppHeader: React.FC<IAppHeaderProps> = () => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [{ breadcrumbs }] = useAppState();

  const togglePersonMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl !== null) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const closePersonMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="app-header">
      <AppBar position="static">
        <Toolbar>
          <Box display="inline" mr={1}>
            <IconButton edge="start" color="inherit" aria-label="menu" component={RouterLink} to={`/`}>
              <ClassIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" className={classes.title}>
            Walden Course Authoring
          </Typography>

          <Box display="inline" mr={1}>
            <Button aria-label="menu" variant="contained" color="default" aria-haspopup="true" aria-controls="user-menu" onClick={togglePersonMenu}>
              <PersonIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closePersonMenu}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={closePersonMenu}>Logout</MenuItem>
            </Menu>
          </Box>

        </Toolbar>

      </AppBar>

      <Breadcrumbs aria-label="breadcrumb" className="app-breadcrumbs">
        <Link color="inherit" component={RouterLink} to={`/`}>
          <HomeIcon className="app-breadcrumbs-icon"/> Home
        </Link>
        { breadcrumbs.map((breadcrumb, index) => {
          return (
            <Link key={index} color="inherit" component={RouterLink} to={breadcrumb.to}>
              { breadcrumb.icon !== undefined && breadcrumb.icon() }
              { breadcrumb.title }
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default AppHeader;