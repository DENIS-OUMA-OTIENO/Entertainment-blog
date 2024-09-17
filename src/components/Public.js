import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Header from './Header'
import Footer from './Footer';
import { useGetPostsQuery } from '../features/DashBoard/posts/postsApiSlice';
import { useParams } from 'react-router-dom';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Facts', url: '#' },
  { title: 'History', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];





// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Public = () => {

  const {data: posts,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetPostsQuery()


const { category } = useParams()

if(isError) <p>{error?.data?.message}</p>


let featuredPost
let mainPost
if(isSuccess){
  const { ids } = posts;

 
  const mainFeaturedPost = ids.find(id => posts.entities[id].featured === true && posts.entities[id].category === category);
  const mainFeaturedPostRoot = ids.find(id => posts.entities[id].featured === true)
 
  const filteredPosts = ids.filter(id => id !== mainFeaturedPost && (
    (posts.entities[id].featured === false && posts.entities[id].category === category)
    || (posts.entities[id].featured === true && posts.entities[id].category === category )));
   
    const filteredPostsRoot = ids.filter(id => id !== mainFeaturedPost && (posts.entities[id].featured === false || posts.entities[id].featured === true));

  featuredPost = (filteredPosts.length > 0) ? filteredPosts.map(postId => <FeaturedPost postId={postId} isLoading={isLoading} />)
  : filteredPostsRoot.map(postId => <FeaturedPost postId={postId} isLoading={isLoading} />)
  mainPost = mainFeaturedPost ? <MainFeaturedPost postId={mainFeaturedPost} isLoading={isLoading} /> 
  : <MainFeaturedPost postId={mainFeaturedPostRoot} isLoading={isLoading} />;
  

}  
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <CssBaseline /> */}
      <Container maxWidth="lg" sx={{paddingLeft: '0 !important', paddingRight: '0 !important'  }}>
        <Header  sections={sections}  />
        <Container sx={{ width: { xs: '100%', sm: 700 }, }}>
        <main>
        {mainPost}
          <Grid container spacing={4}>

          
            {featuredPost}
          
            
          </Grid>
    
        </main>
        </Container>
        
      </Container>
      <Footer />
      
    </ThemeProvider>
  );
}

export default Public