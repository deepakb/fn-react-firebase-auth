import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Navigation from './Navigation';
import Body from './Body';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Navigation />
      <Body content={children} />
    </div>
  );
}
