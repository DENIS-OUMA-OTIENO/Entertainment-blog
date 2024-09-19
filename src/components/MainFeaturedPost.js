import * as React from 'react';
import { memo } from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById } from '../features/DashBoard/posts/postsApiSlice';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { setPostId } from '../features/DashBoard/posts/postSlice';
import DOMPurify from "dompurify";



const MainFeaturedPost = ({ postId, isLoading }) => {
  const post = useSelector(state => selectPostById(state, postId))

  const strippedPostTitle = DOMPurify.sanitize(post.title)
  const strippedPostDescription = DOMPurify.sanitize(post.description)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePostClick = () => {
    dispatch(setPostId(postId))
    navigate(`/${post.category}/${post.slug}`)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  return (
    <Paper
    onClick={handlePostClick}
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: imageLoaded ? `url(${post.imageVideoUrl})` : 'none',
        borderRadius: 0, 
        display: 'flex',
        alignItems: 'end', 
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      style={{ height: '400px',}}
    >
      {isLoading ? (
      <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 0 }} />
    ) : (
      <img style={{ display: 'none' }} src={post.imageVideoUrl} alt={post.title} onLoad={handleImageLoad} />
    )}
      
      
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.8))'
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
          
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              textAlign: 'center', 
              height: 150,
              textOverflow: 'hidden',
           
            
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="text" width="80%" height={50} />
                <Skeleton variant="text" width="60%" height={30} />
              </>
            ) : (
              <>
                <Typography 
               
                gutterBottom
                component="h5"
                variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontFamily: '"Roboto", sans-serif', 
                    color: 'white',
                    mb: 2,}}
                
                >
                  <span dangerouslySetInnerHTML={{ __html: strippedPostTitle }} />
                </Typography>
                <Typography 
                
                variant="h6"
                  component="p"
                  sx={{
                    color: 'white',
                    opacity: 0.9,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                
                >
                  <span dangerouslySetInnerHTML={{ __html: strippedPostDescription }} />
                </Typography>
              </>
            )}
            
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
const MemoizedFeaturedPost = memo(MainFeaturedPost)

export default MemoizedFeaturedPost;


