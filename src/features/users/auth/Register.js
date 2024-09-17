import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getSignUpTheme from './login/theme/getSignInTheme';
import { GoogleIcon  } from './login/loginComponents/CustomIcons';
import { useRegisterMutation } from './authApiSlice';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));
 
const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    height: '100dvh',
  },
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function Register() {
  const mode = 'light';
  //const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: ''
    }
  })
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [fullNameError, setFullNameError] = React.useState(false);
  const [fullNameErrorMessage, setFullNameErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('')


  const [register, { isSuccess }] = useRegisterMutation()
  const navigate = useNavigate()


  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const fullName = document.getElementById('fullName');
    const username = document.getElementById('username')

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!fullName.value || fullName.value.length < 1) {
      setFullNameError(true);
      setFullNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setFullNameError(false);
      setFullNameErrorMessage('');
    }

    if(!username.value || username.value.length < 7 || username.value.length > 15 || !/^[a-zA-Z0-9]+$/.test(username.value)) {
      setUsernameError(true)
      setUsernameErrorMessage('Username must be between 7 and 15 characters')
      
    } else{
      setUsernameError(false)
      setUsernameErrorMessage('')
    }

    return isValid;
  };

  React.useEffect(() => {
    if(isSuccess){
        reset()
        navigate('/dash/posts')
      }
  },[isSuccess, navigate, reset])

  const onSubmit = async (data) => {

    try {
      const response = await register(data);
      console.log(response)
      
    } catch (error) {
     
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme} >
      <CssBaseline />

      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100dvh',
            p: 2,
          }}
        >
          <Card variant="outlined">
            
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <FormControl>
                <FormLabel htmlFor="name">Username</FormLabel>
                <Controller
                name='username'
                control={control}
                render={({field}) => (
                  <TextField
                        {...field}
                        autoComplete="username"
                        name="username"
                        id='username'
                        fullWidth
                        required
                        placeholder="Username"
                        variant='outlined'
                        error={usernameError}
                        helperText={usernameErrorMessage}
                        color={usernameError ? 'error' : 'primary'}
                                                
                    />
                )}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <Controller
                name='fullName'
                control={control}
                render={({field}) => (
                  <TextField
                        {...field}
                        autoComplete="fullName"
                        name="fullName"
                        id='fullName'
                        fullWidth
                        required
                        placeholder="Full name"
                        variant='outlined'
                        error={fullNameError}
                        helperText={fullNameErrorMessage}
                        color={fullNameError ? 'error' : 'primary'}
                                                
                    />
                )}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Controller
                name='email'
                control={control}
                render={({field}) => (
                  <TextField
                  {...field}
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
                )}
              />                
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                  {...field}
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
                )}
                  
                />
                
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <span>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Box>
            <Divider>
              
            </Divider>
            
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}