import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Orders from './Orders';
import Layout from '../sections/Layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
