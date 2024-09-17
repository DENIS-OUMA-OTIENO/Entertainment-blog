import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import useAuth from '../users/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import NewComment from '../comments/NewComment';
import ShowComments from '../comments/ShowComments';
import DOMPurify from "dompurify";

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Facts', url: '#' },
  { title: 'History', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];



const PostPage = ({ post }) => {

  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png|avif)$/.test(url)
  }

  const [showCommentBox, setShowCommentBox] = useState(false)
  const [showAvailableComments, setShowAvailableComments] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const { username } = useAuth()
  const navigate = useNavigate()

  const dateCreated = new Date(post.createdAt).toLocaleString()
  const dateUpdated = new Date(post.updatedAt).toLocaleString()

  const handleCommentsClick = () => {
    if(!showAvailableComments){
      setShowAvailableComments(true)
    } else {
      
      setShowAvailableComments(false)
    }
    
  }

  const handleLeaveCommentClick = () => {
    if(username){
     setShowCommentBox(true)
    } else {
      setShowLoginAlert(true)
      setTimeout(() => {
        setShowLoginAlert(false)
        navigate('/login', { state: { from: window.location.pathname }})
      }, 2000)
     
    }
  }

  const handleCancelClick = () => {
    setShowCommentBox(false)
  }
  
  const strippedPostTitle = DOMPurify.sanitize(post.title)
  const strippedPostDescription = DOMPurify.sanitize(post.description)
  const strippedPostContent = DOMPurify.sanitize(post.content)
  return (
    <>
    <Header sections={sections} />
    <Container maxWidth="lg" sx={{ width: { xs: '100%', sm: 700 }}}>
    
    <CardActionArea >
        
        <Card 
        sx={{ 
          
          width: '100%',
          maxWidth: 700, 
          height: {xs: 'auto', sm: 400 },
          borderRadius: 0 
        }}
          >
        {isImage(post.imageVideoUrl) ? (
            <CardMedia
              component="img"
              image={post.imageVideoUrl}
              alt={post.title}
              sx={{ 
                
                width: { xs: '100%', sm: 700 }, 
                height: { xs: 'auto', sm: '400' }, 
                objectFit: 'cover' }}
            />
          ) : (
            <CardMedia
              component="video"
              controls
              sx={{ 
                width: { xs: '100%', sm: 700 }, 
                height: { xs: 'auto', sm: 'auto' }, 
                objectFit: 'cover' }}
            >
              <source src={post.imageVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </CardMedia>
          )}
          

        </Card>
        
      </CardActionArea>

    
    <Box sx={{ mb: 4, }}>
      <Typography 
      component="p" 
      align="center" 
      sx={{ fontSize: '0.8rem', paddingTop: 2,  }} 
      gutterBottom>
        Published: {dateCreated} | Updated: {dateUpdated}
      </Typography>
      <Typography component="h1" variant="h4" gutterBottom sx={{ textTransform: 'uppercase'}}>
      <div
      dangerouslySetInnerHTML={{ __html: strippedPostTitle }}
      >
      </div>
      
      </Typography>
      <Typography component="h3" variant="h5" gutterBottom>
        <div
        dangerouslySetInnerHTML={{ __html: strippedPostDescription }}
        >
        </div>
      </Typography>
      <Typography variant="body1" component='p' sx={{ whiteSpace: 'pre-wrap' }} 
      >
        <div
        dangerouslySetInnerHTML={{ __html: strippedPostContent }}
        >
        </div>
      </Typography>
    </Box>
    {showLoginAlert && ( 
          <Alert severity="warning">You need to sign in to comment.</Alert>
        )}
        
    {showCommentBox ? (
            
      <NewComment /> 
    ):(
      <Button 
      onClick={handleLeaveCommentClick}
      sx={{ 
        textTransform: 'lowercase',
        color: 'black',
        fontFamily: 'cursive',
        marginRight: 'auto'   
      }}
      >Leave a comment</Button> 
      )
    
    }
    {showCommentBox && 
    <Button 
    onClick={handleCancelClick}
    sx={{ 
      textTransform: 'lowercase',
      color: 'black',
      fontFamily: 'cursive',
      marginRight: 'auto'   
    }}
    >
      Cancel
    </Button> 
    }
    <Button
    onClick={handleCommentsClick}
    >
    Comments
    </Button>
    {showAvailableComments && <ShowComments />}
    
  </Container>
  <Footer />
  </>
  )
}

export default PostPage