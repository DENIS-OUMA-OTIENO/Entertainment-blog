import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const ListItems = () => {

   return (
    <React.Fragment>
    <Link to='/' style={{ textDecoration: 'none'}}>
   <List
       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',  }}
       component="nav"
       aria-labelledby="nested-list-subheader"
  
     >
   <ListItemButton
           
           sx={{
             color: '#30302f',
             
           }}
           component="nav"
           aria-labelledby="nested-list-subheader"
   >
     <ListItemIcon>
       <HomeIcon />
     </ListItemIcon>
  
     <ListItemText  
     primary="Home" 
    
     />
     
     </ListItemButton>
     <Collapse  timeout="auto" unmountOnExit>
   <List component="div" disablePadding>

   </List>
 </Collapse>
   
 </List>
 </Link>

 <Link to='/dash/posts' style={{ textDecoration: 'none'}}>
   <List
       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
       component="nav"
       aria-labelledby="nested-list-subheader"
  
     >
   <ListItemButton
           
           sx={{
              color: '#30302f'
           }}
           component="nav"
           aria-labelledby="nested-list-subheader"
   >
     <ListItemIcon>
       <DynamicFeedIcon />
     </ListItemIcon>
  
     <ListItemText primary="Posts" />
     
     </ListItemButton>
     <Collapse  timeout="auto" unmountOnExit>
   <List component="div" disablePadding>

   </List>
 </Collapse>
   
 </List>
 </Link>

 <Link to='/dash/users' style={{ textDecoration: 'none'}}>
   <List
       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
       component="nav"
       aria-labelledby="nested-list-subheader"
  
     >
   <ListItemButton
           
           sx={{
             color: '#30302f'
           }}
           component="nav"
           aria-labelledby="nested-list-subheader"
   >
     <ListItemIcon>
       <PeopleIcon />
     </ListItemIcon>
  
     <ListItemText primary="Users" />
     
     </ListItemButton>
     <Collapse  timeout="auto" unmountOnExit>
   <List component="div" disablePadding>

   </List>
 </Collapse>
   
 </List>
 </Link>

 <Link to='/dash/comments' style={{ textDecoration: 'none'}}>
   <List
       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
       component="nav"
       aria-labelledby="nested-list-subheader"
  
     >
   <ListItemButton
           
           sx={{
             color: '#30302f'
           }}
           component="nav"
           aria-labelledby="nested-list-subheader"
   >
     <ListItemIcon>
       <CommentIcon />
     </ListItemIcon>
  
     <ListItemText primary="Comments" />
     
     </ListItemButton>
     <Collapse  timeout="auto" unmountOnExit>
   <List component="div" disablePadding>

   </List>
 </Collapse>
   
 </List>
 </Link>


   <Link to='/dash/posts/new' style={{ textDecoration: 'none'}}>
   <List
       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
       component="nav"
       aria-labelledby="nested-list-subheader"
  
     >
   <ListItemButton
           
           sx={{
            color: '#30302f'
           }}
           component="nav"
           aria-labelledby="nested-list-subheader"
   >
     <ListItemIcon>
       <PostAddIcon />
     </ListItemIcon>
  
     <ListItemText primary="Create post" />
     
     </ListItemButton>
     <Collapse  timeout="auto" unmountOnExit>
   <List component="div" disablePadding>

   </List>
 </Collapse>
   
 </List>
 </Link>


   </React.Fragment>

 )
 }


export default ListItems









