import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../sections/Copyright';
import { errorConfig } from '../../configs/error';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { loginError } = errorConfig;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let error = {};

    if (!emailRef.current.value || emailRef.current.value === '') {
      error.email = loginError.email;
    }

    if (!passwordRef.current.value || passwordRef.current.value === '') {
      error.password = loginError.password;
    }

    if (Object.keys(error).length > 0) {
      return setError(error);
    }

    try {
      setError(null);
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError({ status: 'Failed to log in. Please try again!' });
      setOpen(true);
    }

    setLoading(false);
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            inputRef={emailRef}
            error={error && error.email ? true : false}
            helperText={error ? error.email : ''}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputRef={passwordRef}
            error={error && error.password ? true : false}
            helperText={error ? error.password : ''}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/forgot-password' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key='topright'
      >
        <Alert onClose={handleClose} severity='error'>
          {error ? error.status : ''}
        </Alert>
      </Snackbar>
    </Container>
  );
}
