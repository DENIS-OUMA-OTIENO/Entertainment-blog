import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/users/auth/login/Login';
import Register from './features/users/auth/Register';
import DashLayout from './components/DashBoard/DashLayout';
import ShowPosts from './features/DashBoard/posts/ShowPosts';
import EditPost from './features/DashBoard/posts/EditPost'
import RequireAuth from './features/users/auth/RequireAuth';
import ShowPostPage from './features/posts/ShowPostPage';
import ShowUsers from './features/DashBoard/users/ShowUsers'
import PersistLogin from './features/users/auth/PersistLogin';
import NewPostForm from './features/DashBoard/posts/NewPostForm';
import ShowComments from './features/DashBoard/comments/ShowComments';

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='/:category' element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path=':category/:slug' element={<ShowPostPage />} />

        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth admin='admin100' />}>
          <Route path='dash' element={<DashLayout />}>
            <Route path='posts'>
              <Route index  element={<ShowPosts />} />
              <Route path=':id' element={<EditPost />} />
              <Route path='new' element={<NewPostForm />} />
              
            </Route>
            <Route path='users' element={<ShowUsers />} />
            <Route path='comments' element={<ShowComments />} />
            
            
            
          </Route>
        </Route>
        </Route>
        

        
      </Route>
    </Routes>
  );
}

export default App;
