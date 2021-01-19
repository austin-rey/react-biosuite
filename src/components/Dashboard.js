import React from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {Drawer,CssBaseline} from '@material-ui/core';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: theme.palette.brown.main,
    padding: theme.spacing(2),
    position: 'relative',
    whiteSpace: 'wrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    overflow: 'hideen',
    flexGrow: 1,
    backgroundColor: theme.palette.grey.light
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {props.sidebar}
      </Drawer>
      <main className={classes.content}>
      
           {props.mainContent}
      </main>
    </div>
  );
}

export default Dashboard
