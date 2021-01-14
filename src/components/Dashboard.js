import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <Grid container>
      <Grid item xs>
        Welcome {currentUser.email}
      </Grid>
      <Grid item>
        <Link href='#' onClick={handleLogout} variant='body2'>
          Logout
        </Link>
      </Grid>
    </Grid>
  )
}
