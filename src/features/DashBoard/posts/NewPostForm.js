import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import FormControl from "@mui/material/FormControl"
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { useCreatePostMutation } from './postsApiSlice'
import { Controller, useForm } from 'react-hook-form'
import useAuth from '../../users/hooks/useAuth';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';


const NewPostForm = () => {

  const navigate = useNavigate()
  const { username } = useAuth()
  

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      user: username,
      title: '',
      description: '',
      content: '',
      category: 'uncategorized',
      featured: false
    }
  })
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPostErrorMsg, setNewtPostErrorMsg] = useState(false);
  const [newPostSuccessMsg, setNewPostSuccessMsg] = useState(false)


  const [createPost, { isSuccess, isLoading, isError }] = useCreatePostMutation();

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
  };

  useEffect(() => {
    if(isSuccess){
        reset()
        setSelectedFile('null')
        setTimeout(() => {
          setNewPostSuccessMsg(true)
          navigate('/dash/posts')
        }, 2000)
        
      }
  },[isSuccess, navigate, reset])

  useEffect(() => {
    if(isError){
      setNewtPostErrorMsg(true)
    }
  }, [isError])

  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append('user', data.user)
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('featured', data.featured)
    formData.append('file', selectedFile);

    try {
       await createPost(formData);
      
    } catch (error) {
      console.log(error)
    }
  };
  

  return (
    
  <React.Fragment>
            <div style={{ backgroundColor: '#fff', borderRadius: 4}}>
            <h1>Create a post</h1>
            <FormControl fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'auto' }}>
            {newPostErrorMsg && ( 
            <Alert severity="warning">Unable to create post. please try again.</Alert>
            )}
            {newPostSuccessMsg && ( 
            <Alert severity="success">Post created successfully.</Alert>
            )}
                <Controller
                name='title'
                control={control}
                rules={{
                  required: true,
                  maxLength: { value: 15, message: "Title cannot exceed 15 characters" }
                }}
                render={({field, fieldState: { error }}) => (
                  <TextField
                        {...field}
                        label='Title'
                        variant='outlined'
                        fullWidth
                        required
                        slotProps={{ htmlInput: {maxLength: 15} }} 
                        helperText={error ? error.message : `${field.value?.length}/15`}
                        error={!!error}
                    />
                )}
                />

                <Controller
                name='description'
                control={control}
                rules={{
                  required: true,
                  maxLength: { value: 35, message: "Description cannot exceed 35 characters" }
                }}
                render={({field, fieldState: { error }}) => (
                  <TextField
                        {...field}
                        label='Description'
                        variant='outlined'
                        fullWidth
                        required
                        slotProps={{ htmlInput: {maxLength: 35} }} 
                        helperText={error ? error.message : `${field.value?.length}/35`}
                        error={!!error}
                    />
                )}
                />
                    
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                  <Controller
                  name='category'
                  control={control}
                  render={({ field }) => (
                    <Select
                    {...field}
                    labelId="category-label"
                    label="Category"               
                    >
                        <MenuItem disabled value='uncategorized'>Select category</MenuItem>
                        <MenuItem value='technology'>Technology</MenuItem>
                        <MenuItem value='science'>Science</MenuItem>
                        <MenuItem value='facts'>Facts</MenuItem>
                        <MenuItem value='history'>History</MenuItem>
                        <MenuItem value='health'>Health</MenuItem>
                        <MenuItem value='style'>Style</MenuItem>
                        <MenuItem value='travel'>Travel</MenuItem>
                        
                    </Select>                  
                    
                  )}
                  />
                </FormControl>                  
                <div style={{ display: 'flex', gap: 2}}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                
    
                    <Input
                    fullwidth={true}
                    required
                    type='file'
                    accept='image/*, video/*'
                    // hidden
                    onChange={handleFileUpload}
                  />
                </Button>
                <FormControlLabel
                control={
                  <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Featured"
              />
                </div>

                
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Controller
                name='content'
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    theme="snow"
                    placeholder="Write something..."
                    style={{ minHeight: '200px', flexGrow: 1, }}
                  />
                )}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Posting' : 'Publish'}
            </Button>
            
              </Box>
            </form>
            </FormControl>
            
            </div>
            </React.Fragment>
            
        
    );

}

export default NewPostForm