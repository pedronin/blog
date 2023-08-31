import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import AddPost from './pages/AddUpdatePost/AddPost';
import UpdatePost from './pages/AddUpdatePost/UpdatePost';
import FullPost from './pages/FullPost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create" element={<AddPost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
