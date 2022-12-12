/********************************************************/
// CSS
import './App.css';
/********************************************************/
// REACT IMPORTS
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
/********************************************************/
// COMPONENTS
import { Posts } from './pages/post-page/posts/posts.component';
import { PostDetails } from './pages/post-detail-page/post-details/post-details.component';
import { AddPost } from './pages/add-post-page/add-post/add-post.componet';
import { Navigation } from './componets/navigation/Navigation.component';
/********************************************************/
// PROVIDERS
import { PostsProvider } from './context/posts.context';
import { PostDetailProvider } from './context/post-details.context';
import { AddPostProvider } from './context/add-post.context';
/********************************************************/

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <AddPostProvider>
        <PostsProvider>
          <PostDetailProvider>
            <Routes>
              <Route path="/posts" element={<Posts />}></Route>
              <Route path="/details/:id" element={<PostDetails />}></Route>
              <Route path="/add-new-post" element={<AddPost />}></Route>
            </Routes>
          </PostDetailProvider>
        </PostsProvider>
      </AddPostProvider>
    </BrowserRouter>
  );
}

export default App;
