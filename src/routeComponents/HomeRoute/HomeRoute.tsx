import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

import SchoolIcon from '@material-ui/icons/School';
import TimelineIcon from '@material-ui/icons/Timeline';

import NavItem from '../../components/NavItem/NavItem';

import './HomeRoute.scss';
import useAppState from '../../globalState/useAppState';

export interface IHomeProps {
  children?: React.ReactNode;
}

const HomeRoute: React.FC<IHomeProps> = () => {

  const [ appState, appStateStore ] = useAppState();

  useEffect(() => {
    appStateStore.update({breadcrumbs: []});
  }, [appStateStore]);

  const navItemVariants = {
    hidden: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    },
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    }
  };

  const navItems = [
    {
      name: 'Courses',
      to: '/courses',
      description: 'View and edit courses, modules, and pages',
      icon: () => { return (<SchoolIcon fontSize="inherit" className="home-option-name-icon"/>)}
    },
    {
      name: 'Activity',
      to: '/activity',
      description: 'View activity from course authors',
      icon: () => { return (<TimelineIcon fontSize="inherit" className="home-option-name-icon"/>)}
    }
  ];

  return (

    <Grid container spacing={3} className="home-route">

      <Hidden smDown>
        <Grid item md={3} xl={3}></Grid>
      </Hidden>

      <Grid item xs={12} sm={12} md={6}>

        <h2>Open Equella Headless CMS Demo</h2>

        <motion.ul variants={navItemVariants} initial="hidden" animate="show" className="home-nav-list">
          { navItems.map((navItem) => (
            <NavItem navItem={navItem} key={navItem.name} />
          ))}
        </motion.ul>

      </Grid>
    </Grid>
  );
};

export default HomeRoute;


