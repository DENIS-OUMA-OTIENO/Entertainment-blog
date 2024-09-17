import React, { useRef, useEffect } from 'react'
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
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import getSignInTheme from './theme/getSignInTheme';
import { useDispatch } from 'react-redux'
import { setCredentials } from '../authSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../authApiSlice';
import { useForm } from 'react-hook-form';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

const Login = () => {
  const mode = 'light'
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [usernameError, setUsernameError] = React.useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  
  const userRef = useRef()

  const { handleSubmit, register} = useForm()
 
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  
  const from = location.state?.from || '/'

  const [login, {
      isLoading,
      isSuccess
  }] = useLoginMutation()

  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
    if(isSuccess) {
      setPasswordError('')
      navigate(from)
    } 
  }, [isSuccess, navigate, from])

  const onSubmit = async (data) => {
    
    try {
        const { accessToken } = await login(data).unwrap()
        
        dispatch(setCredentials({ accessToken }))
        
        
    } catch (err) {
        if (!err.status) {
            setPasswordError('No Server Response');
        } else if (err.status === 404) {
          setUsernameError(true)
          setUsernameErrorMessage(`user doesn't exist`)
        }
         else if (err.status === 400) {
            setPasswordError(true)
            setPasswordErrorMessage('Missing Username or Password')
            setUsernameError(true)
            setUsernameErrorMessage('Missing Username or Password')
        } else if (err.status === 401) {
          setPasswordError(true)
          setPasswordErrorMessage('Wrong username or password');
        } else {
            setPasswordError(err.data?.message);
        }
        
    }
}


let content
if(isLoading) content = <p>Loading...</p>
  

  content = (
    <ThemeProvider theme={SignInTheme }>
      <CssBaseline />

      <SignInContainer direction="column" justifyContent="space-between">
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
              Sign in
            </Typography>
            
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Username</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id="username"
                  type="text"
                  name="username"
                  placeholder="username"
                  autoComplete="username"
                  inputRef={userRef}
                  {...register('username', { required: true })}
                  autoFocus
                  fullWidth
                  variant="outlined"
                  color={usernameError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  // inputRef={userRef}
                  autoComplete="current-password"
                  {...register('password', { required: true })}
                  autoFocus
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                
              >
                Sign in
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <span>
                  <Link
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                    href='/register'
                  >
                    Sign up
                  </Link>
                </span>
              </Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              
            </Box>
           
          </Card>
        </Stack>
      </SignInContainer>
    </ThemeProvider>
  )

  return content
}

export default Login








    