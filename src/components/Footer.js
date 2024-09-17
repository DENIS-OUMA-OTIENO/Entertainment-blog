import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X'
import TikTokIcon from '@mui/icons-material/MusicNote'
import Divider from '@mui/material/Divider'

function Copyright() {
  return (
    <Typography variant="body2" color="#f2f6f7" align="center">
      {'Copyright © '}
      
        DJ Insta
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {

//footer bgcolor: '#313436'
  return (
    <Box component="footer" sx={{  py: 6, backgroundColor: '#313436' }}>
          <Container maxWidth="lg"
            sx={{ 
              display: 'flex', 
              justifyContent:  'center', 
              flexDirection: {xs: 'column', sm: 'row'}, 
              alignItems: 'center',
              marginBottom: 4,
              gap: {xs: 4, sm: 15} }}>
        
        <div>
        <Typography
          variant="subtitle1"
          align="center"
          color="gray"
          component="p"
          sx={{ fontWeight: 'bold'}}
          
        >
          FOLLOW DJ INSTA
          
        </Typography>
        <Divider color="#fff"></Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mr: 1 }}>
          <IconButton
            component={Link}
            href="https://x.com" 
            target="_blank"
            rel="noopener"
            sx={{ color: '#000000', backgroundColor: 'white', mr: 1 }}
          >
            <XIcon />
          </IconButton>

          <IconButton
            component={Link}
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            sx={{ color: '#1877F2', backgroundColor: 'white', mr: 1  }}
          >
            <Facebook />
          </IconButton>

          <IconButton
            component={Link}
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            sx={{ color: '#E4405F', backgroundColor: 'white', mr: 1  }}
          >
            <Instagram />
          </IconButton>

          <IconButton
            component={Link}
            href="https://tiktok.com"
            target="_blank"
            rel="noopener"
            sx={{ color: '#000000', backgroundColor: 'white', mr: 1  }}
          >
            <TikTokIcon />
          </IconButton>

          <IconButton
            component={Link}
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener"
            sx={{ color: '#25D366', backgroundColor: 'white' }}
          >
            <WhatsApp />
          </IconButton>
        </Box>
        </div>
        <div>
        <Typography
          variant="subtitle1"
          align="center"
          color="gray"
          component="p"
          sx={{ fontWeight: 'bold'}}
        
        >
          SERVICES
          
        </Typography>
        <Divider color="#fff"></Divider>

        <Typography
          variant="subtitle1"
          align="center"
          color="#f2f6f7"
          component="p"
          
        >
          Contact Us
          
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="#f2f6f7"
          component="p"
        >
         
          About Us
        </Typography>
        </div>
        
      </Container>
      <Copyright />
    </Box>
  );
}



export default Footer;