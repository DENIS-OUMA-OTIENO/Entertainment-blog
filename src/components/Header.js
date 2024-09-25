import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuth from '../features/users/hooks/useAuth';
import { useSendLogoutMutation } from '../features/users/auth/authApiSlice';


function Header(props) {
  const { sections } = props;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appBarPosition, setAppBarPosition] = useState('static')
  const [showSubscribeBtn, setShowSubscribeBtn] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showDashboard, setShowDashboard] = useState(false)

  const { username } = useAuth()
  const navigate = useNavigate()

  const [sendLogout, {
    isSuccess,
    
  }] = useSendLogoutMutation()

 React.useEffect(() => {
  if(username === 'admin100'){
    setShowDashboard(true)
  } else {
    setShowDashboard(false)
  }
 }, [username]) 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDashboardClick = () => {
    navigate('/dash/posts')
    handleMenuClose()
  }
 
    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }


    const onSignInClicked = () => {
        navigate('/login')
    }

    const onSignOutClicked = async () => {
      await sendLogout();
    };
    
    const handleLogoClick = () => {
      navigate('/')
    }

  
    React.useEffect(() => {
      if(isSuccess) {
        
        navigate('/') }
    },[isSuccess, navigate])

    
    React.useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 50){
          setAppBarPosition('fixed')
          setShowSubscribeBtn(true)
        } else {
          setAppBarPosition('static')
          setShowSubscribeBtn(false)
        }
      }
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])
  return (
    <React.Fragment>
      <Toolbar 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'white', 
        backgroundColor: '#ff000d',  
        paddingLeft: 1, 
        width: '100%', 
                
        }}>
        
        <Box
        component='img'
        onClick={handleLogoClick}
        sx={{ width: 40, height: 40, cursor: 'pointer'}} 
        src='/LOGO.jpg' 
        alt='DJ insta'
        />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {/* {title} */}
        </Typography>
        
      {username ? 
      <div>
      <Button
        size="small"
        onClick={handleMenuOpen}
        sx={{ color: 'white', fontWeight: 'bold'}}
      >
          {username}
        </Button>
        <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        
      >
        { showDashboard && <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>}
        {/* <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem> */}
        <MenuItem onClick={onSignOutClicked}>Sign out</MenuItem>
      </Menu>
      </div>
        :
        <Button
        size="small"
        sx={{ color: 'white', fontWeight: 'bold' }}
        onClick={onSignInClicked}
        >
          Sign in
        </Button>
      }

        
    </Toolbar>


      <AppBar 
      position={appBarPosition} 
      color="default"  
      sx={{
      width: '100%',      
      top: 0,             
      left: 0,   
      marginBottom: 2,
      padding: 0,         
      boxShadow: 'none',
      backgroundColor: '#ff000d',
      transition: 'top 0.3s ease-in-out' 
      
  }}>
      {/* Toolbar with Menu Icon for xs screens */}
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          overflowX: 'auto',
          margin: 0,
          padding: 0, 
          display: { xs: 'flex', sm: 'none' }, // Show menu icon on xs screens only
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleToggleDrawer}
          sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white', paddingLeft: 3  }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for xs screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        
        onClose={handleToggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' }, 
          '& .MuiDrawer-paper': { width: '100%' }, 
        }}
      >
        <IconButton
        edge="start"
        color="inherit"
        onClick={handleToggleDrawer}
        sx={{ paddingLeft: 0, paddingTop: 2, justifyContent: 'right' }}
        >
          <div>
        <CloseIcon />
        <Typography variant="body1" >
          Close
        </Typography>
        </div>
        </IconButton>
        <List sx={{ width: '100%', padding: 2,  }}>
          {sections.map((section) => (
            <ListItem button key={section.title} onClick={handleToggleDrawer}>
              <RouterLink
                color="inherit"
                variant="body2"
                to={`/${section.title.toLowerCase()}`}
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  width: '100%',
                  fontWeight: 'bold' }}
              >
                <ListItemText  primary={section.title} />
              </RouterLink>
            </ListItem>
          ))}
        </List>
      </Drawer>

  {/* Toolbar for sm and up */}
  <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          overflowX: 'auto',
          display: { xs: 'none', sm: 'flex' }, // Show toolbar links on sm screens and up
        }}
      >
    { showSubscribeBtn 
    ?  <Box
    component='img'
    onClick={handleLogoClick}
    sx={{ width: 40, height: 40, cursor: 'pointer'}} 
    src='/LOGO.jpg' 
    alt='DJ insta'
    /> : null }
            
        {sections.map((section) => (
          
          <RouterLink
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={`/${section.title.toLowerCase()}`}
            style={{ 
              p: 1, flexShrink: 0, 
              textDecoration: 'none', 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: '1rem' }}
          >
            {section.title}
          </RouterLink>
        ))}
        
      </Toolbar>
    </AppBar>
    </React.Fragment>
  );
}


export default Header;
