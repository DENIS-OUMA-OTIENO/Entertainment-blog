import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById } from '../features/DashBoard/posts/postsApiSlice';
import { useNavigate } from 'react-router-dom';
import { setPostId } from '../features/DashBoard/posts/postSlice';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DOMPurify from "dompurify";


function FeaturedPost({ postId, isLoading }) {
  const post = useSelector(state => selectPostById(state, postId))
  
  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png|avif)$/.test(url)
  }
  
  const strippedPostTitle = DOMPurify.sanitize(post.title)
  const strippedPostDescription = DOMPurify.sanitize(post.description)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(setPostId(postId))
  },[dispatch, postId])


  const handlePostClick = () => {
    dispatch(setPostId(postId))
    navigate(`/${post.category}/${post.slug}`)
  }

  if(isLoading){
    return (
      <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex', flexDirection: 'row', width: 320, height: 100 }}>
          <Skeleton variant="rectangular" width={100} height={100} />
          <CardContent sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
          </CardContent>
        </Card>
      </Grid>
    )
  }


  return (
    <Grid item xs={12} md={6}>
      <CardActionArea onClick={handlePostClick}>
        
        <Card 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          width: {xs: '90vw', sm: 310 },
          height: {xs: 100, sm: 100 },
          borderRadius: 0,
          boxShadow: 'none',
          borderBottom: '0.5px solid #e8e8e8',
          paddingBottom: '5px'          
          
        }}
          >
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1  }}>

        {isImage(post.imageVideoUrl) ? (
            <CardMedia
              component="img"
              image={post.imageVideoUrl}
              alt={<span dangerouslySetInnerHTML={{ __html: strippedPostTitle }} />}
              sx={{ width: { xs: 100, sm: 100 }, height: { xs: 100, sm: '100%' }, objectFit: 'cover' }}
            />
          ) : (
            <CardMedia
              component="img"
              image="/thumbnail.png" 
              alt={<span dangerouslySetInnerHTML={{ __html: strippedPostTitle }} />}
              sx={{ width: { xs: 100, sm: 100 }, height: { xs: 100, sm: '100%' }, objectFit: 'cover' }}
            />

          )}
          {!isImage(post.imageVideoUrl) && (
            <IconButton 
             
              onClick={handlePostClick}
              sx={{ 
                // margin: '8px 4px', 
                display: 'block',
                fontSize: '0.5rem', 
                width: '2.2rem',
                height: '2.2rem',
                color: 'white', 
                backgroundColor: '#0d663e',
              }}
            >
              <PlayArrowIcon />             
            </IconButton>
          )}
          </div>
          <CardContent sx={{ flex: 1, height: 100}}>
            <Typography component="h3" 
            sx={{ textTransform: 'uppercase', 
            color: '#0d663e', 
            fontWeight: 'bold', 
            textDecoration: 'none' 
            }}>
              <span dangerouslySetInnerHTML={{ __html: strippedPostTitle }} />
            </Typography>
            
            <Typography variant="subtitle1" component='p' 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              <span dangerouslySetInnerHTML={{ __html: strippedPostDescription }} />
            </Typography>
            
          </CardContent>

        </Card>
        
      </CardActionArea>
    </Grid>
  );
}



export default FeaturedPost;