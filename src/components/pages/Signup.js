import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { signupError } = errorConfig;

  const handleSignup = async e => {
    e.preventDefault();

    let error = {};

    if (!firstNameRef.current.value || firstNameRef.current.value === '') {
      error.firstName = signupError.firstName;
    }

    if (!lastNameRef.current.value || lastNameRef.current.value === '') {
      error.lastName = signupError.lastName;
    }

    if (!emailRef.current.value || emailRef.current.value === '') {
      error.email = signupError.email;
    }

    if (!passwordRef.current.value || passwordRef.current.value === '') {
      error.password = signupError.password;
    }

    if (!confirmPasswordRef.current.value || confirmPasswordRef.current.value === '') {
      error.confirmPassword = signupError.confirmPassword;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      error.password = signupError.passwordNotMatch;
      error.confirmPassword = signupError.passwordNotMatch;
    }

    if (Object.keys(error).length > 0) {
      return setError(error);
    }

    try {
      setError(null);
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSignup} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                inputRef={firstNameRef}
                error={error && error.firstName ? true : false}
                helperText={error ? error.firstName : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                inputRef={lastNameRef}
                error={error && error.lastName ? true : false}
                helperText={error ? error.lastName : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                inputRef={emailRef}
                error={error && error.email ? true : false}
                helperText={error ? error.email : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='current-password'
                inputRef={confirmPasswordRef}
                error={error && error.confirmPassword ? true : false}
                helperText={error ? error.confirmPassword : ''}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
